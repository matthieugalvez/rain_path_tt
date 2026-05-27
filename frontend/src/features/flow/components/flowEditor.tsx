import {
  ReactFlow,
  Background,
  Controls,
  useReactFlow,
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'

import { nodeTypes } from './nodes'

import WorkflowSidebar from './Sidebar'
import WorkflowErrors from '../utils/flowErrors'
import NodePalette from './NodePalette'

import { useWorkflowStore } from '../store/flowStore'

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
        background: '#f5f7fb',
      }}
    >
      <NodePalette />

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
          setSelectedNodeId(
            node.id
          )
        }}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
        <Background />

        <Controls />
      </ReactFlow>
    </div>
  )
}
