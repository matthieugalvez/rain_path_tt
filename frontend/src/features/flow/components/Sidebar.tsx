import { useWorkflowStore } from '../store/flowStore'

import DelayEditor from './editors/DelayEditor'
import ConditionEditor from './editors/ConditionEditor'
import EmailEditor from './editors/EmailEditor'

export default function WorkflowSidebar() {
  const nodes =
    useWorkflowStore(
      (state) => state.nodes
    )

  const selectedNodeId =
    useWorkflowStore(
      (state) =>
        state.selectedNodeId
    )

  const setSelectedNodeId =
  	useWorkflowStore(
    	(state) =>
      state.setSelectedNodeId
  	)

  const selectedNode = nodes.find(
    (node) =>
      node.id === selectedNodeId
  )

  if (!selectedNode) {
    return null
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,

        width: 340,
        height: '100vh',

        background: 'white',

        borderLeft:
          '1px solid #ddd',

        padding: 20,

        zIndex: 20,

		boxShadow:
			'-2px 0 8px rgba(0,0,0,0.04)',
      }}
    >
      <h2>
        {selectedNode.type}
      </h2>

      {selectedNode.type ===
        'delay' && (
        <DelayEditor
          node={selectedNode}
        />
      )}

      {selectedNode.type ===
        'condition' && (
        <ConditionEditor
          node={selectedNode}
        />
      )}

      {selectedNode.type ===
        'email' && (
        <EmailEditor
          node={selectedNode}
        />
      )}

	  <button
	  	onClick={() =>
			setSelectedNodeId(null)
		}
		>
		Fermer
		</button>
    </div>
  )
}
