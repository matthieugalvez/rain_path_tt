import { create } from 'zustand'

import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react'

import type {
  Node,
  Edge,
  Connection,
  NodeChange,
  EdgeChange,
} from '@xyflow/react'

interface WorkflowState {
  nodes: Node[]
  edges: Edge[]

  setNodes: (nodes: Node[]) => void
  setEdges: (edges: Edge[]) => void

  onNodesChange: (
    changes: NodeChange[]
  ) => void

  onEdgesChange: (
    changes: EdgeChange[]
  ) => void

  onConnect: (
    connection: Connection
  ) => void

  addNode: (type: string) => void

  selectedNodeId: string | null

  setSelectedNodeId: (
	  id: string | null
  ) => void

  updateNodeData: (
	  nodeId: string,
	  data: any
  ) => void

  createNode: (
	type: string,
	position: {
    	x: number
    	y: number
  	}
  ) => void
}

export const useWorkflowStore =
  create<WorkflowState>((set) => ({
    nodes: [
      {
        id: 'start',

        type: 'start',

        position: {
          x: 400,
          y: 50,
        },

        data: {},
      },
    ],

    edges: [],

    setNodes: (nodes) =>
      set({
        nodes,
      }),

    setEdges: (edges) =>
      set({
        edges,
      }),

    onNodesChange: (changes) =>
      set((state) => ({
        nodes: applyNodeChanges(
          changes,
          state.nodes
        ),
      })),

    onEdgesChange: (changes) =>
      set((state) => ({
        edges: applyEdgeChanges(
          changes,
          state.edges
        ),
      })),

    onConnect: (connection) =>
      set((state) => ({
        edges: addEdge(
          connection,
          state.edges
        ),
      })),

    addNode: (type) =>
      set((state) => {
        const id = crypto.randomUUID()

        return {
          nodes: [
            ...state.nodes,

            {
              id,

              type,

              position: {
                x: Math.random() * 500,
                y: Math.random() * 500,
              },

              data: getDefaultNodeData(type),
            },
          ],
        }
      }),

	selectedNodeId: null,

	setSelectedNodeId: (id) =>
		set({
			selectedNodeId: id,
		}),

	updateNodeData: (
		nodeId,
		newData
	) =>
		set((state) => ({
			nodes: state.nodes.map((node) => {
				if (node.id !== nodeId) {
					return node
				}

				return {
					...node,

					data: {
						...node.data,
						...newData,
					},
				}
			}),
		})),

		createNode: (
  			type,
  			position
		) =>
  			set((state) => {
    		const id =
      			crypto.randomUUID()

    		return {
			  nodes: [
				...state.nodes,

				{
				  id,

				  type,

				  position,

				  data:
					getDefaultNodeData(
					  type
					),
				},
			  ],
			}
		  }),
  }))

function getDefaultNodeData(type: string) {
  switch (type) {
    case 'delay':
      return {
        days: 7,
      }

    case 'condition':
      return {
        conditionType: 'email_known',
      }

    case 'email':
      return {
        subject: 'Sujet',
        body: 'Contenu',
      }

    default:
      return {}
  }
}
