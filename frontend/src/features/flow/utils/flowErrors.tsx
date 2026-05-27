import { useMemo } from 'react'

import { useWorkflowStore } from '../store/flowStore'

import { validateWorkflow } from '../utils/flowValidation'

export default function WorkflowErrors() {
  const nodes =
    useWorkflowStore(
      (state) => state.nodes
    )

  const edges =
    useWorkflowStore(
      (state) => state.edges
    )

  const errors = useMemo(() => {
    return validateWorkflow(
      nodes,
      edges
    )
  }, [nodes, edges])

  if (errors.length === 0) {
    return null
  }

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 20,
        left: 20,

        zIndex: 20,

        background: '#fee2e2',

        border:
          '1px solid #dc2626',

        borderRadius: 12,

        padding: 16,

        width: 350,
      }}
    >
      <strong>
        Erreurs workflow
      </strong>

      <ul>
        {errors.map(
          (error, index) => (
            <li key={index}>
              {error.message}
            </li>
          )
        )}
      </ul>
    </div>
  )
}
