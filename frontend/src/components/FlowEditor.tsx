import {
  ReactFlow,
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';

import type { Connection } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: '1',
    position: { x: 100, y: 100 },
    data: { label: 'Hello' },
  },
  {
    id: '2',
    position: { x: 400, y: 100 },
    data: { label: 'World' },
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },
];

export default function FlowEditor() {
  const [nodes, setNodes, onNodesChange] =
    useNodesState(initialNodes);

  const [edges, setEdges, onEdgesChange] =
    useEdgesState(initialEdges);

  const onConnect = (connection: Connection) => {
    setEdges((eds) => addEdge(connection, eds));
  };

  const addNode = () => {
    const newNode = {
      id: crypto.randomUUID(),

      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },

      data: {
        label: `Node ${nodes.length + 1}`,
      },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <button
        onClick={addNode}
        style={{
          position: 'absolute',
          zIndex: 10,
          top: 10,
          left: 10,
          padding: '10px',
        }}
      >
        Ajouter un node
      </button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
