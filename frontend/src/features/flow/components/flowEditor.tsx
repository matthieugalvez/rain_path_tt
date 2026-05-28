import { React, useEffect } from 'react'

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
import WorkflowTopbar from './flowTopbar'

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

	const selectedNodes =
	  nodes.filter(
		(node) => node.selected
	  )

  const onNodesChange =
    useWorkflowStore(
      (state) =>
        state.onNodesChange
    )

  const onEdgesChange =
    useWorkflowStore(
      (state) =>
        state.onEdgesChange
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

	const deleteSelectedElements =
	  useWorkflowStore(
		(state) =>
		  state.deleteSelectedElements
	  )

  const currentSimulationNodeId =
    useWorkflowStore(
      (state) =>
        state.currentSimulationNodeId
    )

  const completedSimulationNodeIds =
    useWorkflowStore(
      (state) =>
        state.completedSimulationNodeIds
    )

  const activeSimulationEdgeIds =
    useWorkflowStore(
      (state) =>
        state.activeSimulationEdgeIds
    )

  const setSimulationState =
    useWorkflowStore(
      (state) =>
        state.setSimulationState
    )

  const errors =
    validateWorkflow(
      nodes,
      edges
    )

  const invalidNodeIds =
    getInvalidNodeIds(
      errors
    )

  const styledNodes = nodes.map(
    (node) => ({
      ...node,

      data: {
        ...node.data,

        invalid:
          invalidNodeIds.has(
            node.id
          ),

        simulationStatus:
          node.id ===
          currentSimulationNodeId
            ? 'current'
            : completedSimulationNodeIds.includes(
                  node.id
                )
              ? 'completed'
              : 'future',
      },
    })
  )

  const styledEdges = edges.map(
    (edge) => {
		const currentNode =
		  nodes.find(
			(node) =>
			  node.id ===
			  currentSimulationNodeId
		  )

		const isActive =
		  currentNode?.type ===
		  'condition'
			? edge.source ===
				currentNode.id &&
			  edge.data?.label ===
				currentNode.data
				  ?.activeBranch
			: activeSimulationEdgeIds.includes(
				edge.id
			  )

      const isSelected =
        edge.selected

      return {
        ...edge,

        animated:
          isSelected ||
          isActive,

        style: {
          ...edge.style,

          stroke:
            isSelected
              ? '#2563eb'
              : isActive
                ? '#f59e0b'
                : '#94a3b8',

          strokeWidth:
            isSelected
              ? 5
              : isActive
                ? 4
                : 2,

          opacity:
            isSelected
              ? 1
              : isActive
                ? 1
                : 0.45,
        },
      }
    }
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

	useEffect(() => {
	  const handler = (e: KeyboardEvent) => {
		if (e.key === 'Delete') {
		  deleteSelectedElements()
		}
	  }

	  window.addEventListener(
		'keydown',
		handler
	  )

	  return () => {
		window.removeEventListener(
		  'keydown',
		  handler
		)
	  }
	}, [deleteSelectedElements])

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',

        background:
          '#f3f4f6',

        display: 'flex',

        flexDirection:
          'column',
      }}
    >
      <WorkflowTopbar />

      <div
        style={{
          flex: 1,

          position:
            'relative',
        }}
      >
        <NodePalette />

        <WorkflowSidebar />

        <WorkflowErrors />

        <div
          style={{
            position:
              'absolute',

            bottom: 20,
            left: 280,

            zIndex: 50,

            display: 'flex',

            gap: 10,
          }}
        >
          <button
            onClick={() => {
              const startNode =
                nodes.find(
                  (node) =>
                    node.type ===
                    'start'
                )

              if (!startNode) {
                return
              }

              const outgoingEdge =
                edges.find(
                  (edge) =>
                    edge.source ===
                    startNode.id
                )

              setSimulationState(
                startNode.id,

                [],

                outgoingEdge
                  ? [
                      outgoingEdge.id,
                    ]
                  : []
              )
            }}
          >
            Start Simulation
          </button>

          <button
            onClick={() => {
              if (
                !currentSimulationNodeId
              ) {
                return
              }

              const currentNode =
                nodes.find(
                  (node) =>
                    node.id ===
                    currentSimulationNodeId
                )

              if (!currentNode) {
                return
              }

              let currentEdge

              if (
                currentNode.type ===
                'condition'
              ) {
                currentEdge =
                  edges.find(
                    (edge) =>
                      edge.source ===
                        currentNode.id &&
                      edge.data
                        ?.label ===
                        currentNode
                          .data
                          ?.activeBranch
                  )
              } else {
                currentEdge =
                  edges.find(
                    (edge) =>
                      edge.source ===
                      currentNode.id
                  )
              }

              if (!currentEdge) {
                return
              }

              const nextNodeId =
                currentEdge.target

              const nextOutgoingEdge =
                edges.find(
                  (edge) =>
                    edge.source ===
                    nextNodeId
                )

              setSimulationState(
                nextNodeId,

                [
                  ...completedSimulationNodeIds,

                  currentSimulationNodeId,
                ],

                nextOutgoingEdge
                  ? [
                      nextOutgoingEdge.id,
                    ]
                  : []
              )
            }}
          >
            Next Step
          </button>

          <button
            onClick={() => {
              setSimulationState(
                null,
                [],
                []
              )
            }}
          >
            Reset
          </button>
        </div>

        <ReactFlow
          nodes={styledNodes}
          edges={styledEdges}
			deleteKeyCode={null}
          nodeTypes={nodeTypes}
          onNodesChange={
            onNodesChange
          }
          onEdgesChange={
            onEdgesChange
          }
          onConnect={onConnect}
          onNodeClick={(
            _,
            node
          ) => {
            setSelectedNodeId(
              node.id
            )
          }}
          onPaneClick={() => {
            setSelectedNodeId(
              null
            )
          }}
          onDrop={onDrop}
          onDragOver={
            onDragOver
          }
          fitView
          fitViewOptions={{
            padding: 0.3,
          }}
          defaultEdgeOptions={{
            type:
              'smoothstep',

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
    </div>
  )
}
