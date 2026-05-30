import { create } from "zustand";

import { addEdge, applyNodeChanges, applyEdgeChanges } from "@xyflow/react";

import type {
  Node,
  Edge,
  Connection,
  NodeChange,
  EdgeChange,
} from "@xyflow/react";

interface WorkflowState {
  nodes: Node[];
  edges: Edge[];

  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;

  onNodesChange: (changes: NodeChange[]) => void;

  onEdgesChange: (changes: EdgeChange[]) => void;

  onConnect: (connection: Connection) => void;

  addNode: (type: string) => void;

  selectedNodeId: string | null;

  setSelectedNodeId: (id: string | null) => void;

  deleteSelectedElements: () => void;

  updateNodeData: (nodeId: string, data: any) => void;

  createNode: (
    type: string,
    position: {
      x: number;
      y: number;
    },
  ) => void;

  setWorkflow: (nodes: any[], edges: any[]) => void;

  currentSimulationNodeId: string | null;

  completedSimulationNodeIds: string[];

  activeSimulationEdgeIds: string[];
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  nodes: [
    {
      id: "start",

      type: "start",

      position: {
        x: 100,
        y: 200,
      },

      data: {},
    },

    {
      id: "end",

      type: "end",

      position: {
        x: 900,
        y: 200,
      },

      data: {},
    },
  ],

  edges: [
    {
      id: "start-end",

      source: "start",

      target: "end",
    },
  ],

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
        changes.filter((change) => {
          if (change.type !== "remove") {
            return true;
          }

          const node = state.nodes.find((n) => n.id === change.id);

          return node?.type !== "start" && node?.type !== "end";
        }),

        state.nodes,
      ),
    })),

  onEdgesChange: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),

  onConnect: (connection) =>
    set((state) => {
      const sourceNode = state.nodes.find(
        (node) => node.id === connection.source,
      );

      let label = undefined;

      if (sourceNode?.type === "condition") {
        label = connection.sourceHandle === "yes" ? "YES" : "NO";
      }

      const filteredEdges = state.edges.filter((edge) => {
        // condition node:
        // replace only same handle
        if (sourceNode?.type === "condition") {
          return !(
            edge.source === connection.source &&
            edge.sourceHandle === connection.sourceHandle
          );
        }

        // classic node:
        // replace all outgoing edges
        return edge.source !== connection.source;
      });

      return {
        edges: addEdge(
          {
            ...connection,

            type: "smoothstep",

            label,

            data: {
              label,
            },
          },

          filteredEdges,
        ),
      };
    }),

  addNode: (type) =>
    set((state) => {
      const id = crypto.randomUUID();

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
      };
    }),

  selectedNodeId: null,

  deleteSelectedElements: () =>
    set((state) => {
      const deletedNodeIds = state.nodes
        .filter(
          (node) =>
            node.selected && node.type !== "start" && node.type !== "end",
        )
        .map((node) => node.id);

      const deletedEdgeIds = state.edges
        .filter((edge) => edge.selected)
        .map((edge) => edge.id);

      return {
        nodes: state.nodes.filter((node) => !deletedNodeIds.includes(node.id)),

        edges: state.edges.filter(
          (edge) =>
            !deletedEdgeIds.includes(edge.id) &&
            !deletedNodeIds.includes(edge.source) &&
            !deletedNodeIds.includes(edge.target),
        ),
      };
    }),

  currentSimulationNodeId: null,

  completedSimulationNodeIds: [],

  activeSimulationEdgeIds: [],
  setSelectedNodeId: (id) =>
    set({
      selectedNodeId: id,
    }),

  updateNodeData: (nodeId, newData) =>
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id !== nodeId) {
          return node;
        }

        return {
          ...node,

          data: {
            ...node.data,
            ...newData,
          },
        };
      }),
    })),

  createNode: (type, position) =>
    set((state) => {
      const id = crypto.randomUUID();

      return {
        nodes: [
          ...state.nodes,

          {
            id,

            type,

            position,

            data: getDefaultNodeData(type),
          },
        ],
      };
    }),

  setWorkflow: (nodes, edges) =>
    set({
      nodes,
      edges,
    }),

  setSimulationState: (
    currentNodeId,

    completedNodeIds,

    activeEdgeIds,
  ) =>
    set({
      currentSimulationNodeId: currentNodeId,

      completedSimulationNodeIds: completedNodeIds,

      activeSimulationEdgeIds: activeEdgeIds,
    }),
}));

function getDefaultNodeData(type: string) {
  switch (type) {
    case "delay":
      return {
        days: 7,
      };

    case "condition":
      return {
        conditionType: "email_known",
        activeBranch: "YES",
      };

    case "email":
      return {
        subject: "Sujet",
        body: "Contenu",
      };

    default:
      return {};
  }
}
