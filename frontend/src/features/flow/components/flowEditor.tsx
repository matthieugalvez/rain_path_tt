import {
  ReactFlow,
  Background,
  Controls,
  useReactFlow,
  MiniMap,
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'

import { nodeTypes } from './nodes'

import WorkflowSidebar from './Sidebar'
import WorkflowErrors from '../utils/flowErrors'
import NodePalette from './NodePalette'

import { useWorkflowStore } from '../store/flowStore'

import {
  validateWorkflow,
  getInvalidNodeIds,
} from '../utils/flowValidation'

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

  const createNode =
    useWorkflowStore(
      (state) => state.createNode
    )

  const setSelectedNodeId =
    useWorkflowStore(
      (state) =>
        state.setSelectedNodeId
    )

	const errors = validateWorkflow(
	  nodes,
	  edges
	)

	const invalidNodeIds =
	  getInvalidNodeIds(errors)

	const styledNodes = nodes.map(
	  (node) => ({
		...node,

		data: {
		  ...node.data,

		  invalid:
			invalidNodeIds.has(
			  node.id
			),
		},
	  })
	)

  const { screenToFlowPosition } =
    useReactFlow()

  const onDragOver = (
    event: React.DragEvent
  ) => {
    event.preventDefault()

    event.dataTransfer.dropEffect =
      'move'
  }

  const onDrop = (
    event: React.DragEvent
  ) => {
    event.preventDefault()

    const type =
      event.dataTransfer.getData(
        'application/reactflow'
      )

    if (!type) {
      return
    }

    const position =
      screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })

    createNode(type, position)
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',

        background: '#f3f4f6',

        position: 'relative',
      }}
    >
      <NodePalette />

      <WorkflowSidebar />

      <WorkflowErrors />

      <ReactFlow
        nodes={styledNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={
          onNodesChange
        }
        onEdgesChange={
          onEdgesChange
        }
        onConnect={onConnect}
        onNodeClick={(_, node) => {
          setSelectedNodeId(
            node.id
          )
        }}
        onPaneClick={() => {
          setSelectedNodeId(null)
        }}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
        fitViewOptions={{
          padding: 0.3,
        }}
        defaultEdgeOptions={{
          type: 'smoothstep',

          animated: true,

          style: {
            strokeWidth: 2,
          },
        }}
      >
        <Background />

        <Controls />

        <MiniMap
          pannable
          zoomable
          style={{
            backgroundColor:
              '#ffffff',

            border:
              '1px solid #e5e7eb',
          }}
        />
      </ReactFlow>
    </div>
  )
}
