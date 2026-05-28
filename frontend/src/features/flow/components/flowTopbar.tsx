import {
  useEffect,
  useState,
} from 'react'

import {
  getWorkflow,
  getWorkflows,
  saveWorkflow,
} from '../../../api/workflowApi'

import { useWorkflowStore }
from '../store/flowStore'

export default function WorkflowTopbar() {
  const nodes =
    useWorkflowStore(
      (state) => state.nodes
    )

  const edges =
    useWorkflowStore(
      (state) => state.edges
    )

  const setWorkflow =
    useWorkflowStore(
      (state) =>
        state.setWorkflow
    )

  const [
    workflowName,
    setWorkflowName,
  ] = useState(
    'Nouveau workflow'
  )

  const [
    workflows,
    setWorkflows,
  ] = useState<any[]>([])

  async function refreshWorkflows() {
    try {
      const data =
        await getWorkflows()

      setWorkflows(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    refreshWorkflows()
  }, [])

  async function handleSave() {
    try {
      await saveWorkflow({
        name: workflowName,

        nodes,

        edges,
      })

      await refreshWorkflows()

      alert(
        'Workflow sauvegardé'
      )
    } catch (error) {
      console.error(error)

      alert(
        'Erreur sauvegarde'
      )
    }
  }

  async function handleLoad(
    id: string
  ) {
    if (!id) {
      return
    }

    try {
      const workflow =
        await getWorkflow(id)

      setWorkflow(
        workflow.nodes,
        workflow.edges
      )

      setWorkflowName(
        workflow.name
      )
    } catch (error) {
      console.error(error)

      alert(
        'Erreur chargement'
      )
    }
  }

  return (
    <div
      style={{
		width: '100%',
        height: 70,
		flexShrink: 0,

        background: '#ffffff',

        borderBottom:
          '1px solid #e5e7eb',

        display: 'flex',

        alignItems: 'center',

        justifyContent:
          'space-between',

        padding: '0 20px',

		boxSizing: 'border-box',

        zIndex: 50,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <input
          value={workflowName}
          onChange={(e) =>
            setWorkflowName(
              e.target.value
            )
          }
          style={{
            width: 260,

            padding:
              '10px 14px',

            border:
              '1px solid #d1d5db',

            borderRadius: 10,

            fontSize: 14,
          }}
        />

        <button
          onClick={handleSave}
          style={{
            padding:
              '10px 16px',

            borderRadius: 10,

            border: 'none',

            background:
              '#2563eb',

            color: 'white',

            cursor: 'pointer',

            fontWeight: 600,
          }}
        >
          Save
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span>
          Workflows
        </span>

        <select
          onChange={(e) =>
            handleLoad(
              e.target.value
            )
          }
          style={{
            padding:
              '10px 12px',

            borderRadius: 10,

            border:
              '1px solid #d1d5db',
          }}
        >
          <option value="">
            Charger...
          </option>

          {workflows.map(
            (workflow) => (
              <option
                key={workflow.id}
                value={
                  workflow.id
                }
              >
                {workflow.name}
              </option>
            )
          )}
        </select>
      </div>
    </div>
  )
}
