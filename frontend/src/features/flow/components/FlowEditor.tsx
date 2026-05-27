import {
  ReactFlow,
  Background,
  Controls,
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'

import { nodeTypes } from './nodes'

import WorkflowToolbar from './Toolbar'

import WorkflowSidebar from './Sidebar'

import { useWorkflowStore } from '../store/flowStore'

import WorkflowErrors from '../utils/flowErrors'

export default function WorkflowEditor() {
  const nodes =
    useWorkflowStore(
      (state) => state.nodes
    )

  const edges =
    useWorkflowStore(
      (state) => state.edges
    )

  const onNodesChange =
    useWorkflowStore(
      (state) => state.onNodesChange
    )

  const onEdgesChange =
    useWorkflowStore(
      (state) => state.onEdgesChange
    )

  const onConnect =
    useWorkflowStore(
      (state) => state.onConnect
    )

	const setSelectedNodeId =
		useWorkflowStore(
			(state) =>
			state.setSelectedNodeId
	)

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <WorkflowToolbar />

	  <WorkflowSidebar />

	  <WorkflowErrors />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
		onNodeClick={(_, node) => {
			setSelectedNodeId(node.id)
		}}
        fitView
      >
        <Background />

        <Controls />
      </ReactFlow>
    </div>
  )
}
