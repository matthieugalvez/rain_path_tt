const nodeTypes = [
  {
    type: "delay",
    label: "⏱ Delay",
  },

  {
    type: "condition",
    label: "❓ Condition",
  },

  {
    type: "email",
    label: "📧 Email",
  },

  {
    type: "sms",
    label: "📱 SMS",
  },

  {
    type: "whatsapp",
    label: "🟢 WhatsApp",
  },

  {
    type: "postal",
    label: "📮 Courrier",
  },
];

export default function NodePalette() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);

    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,

        width: 200,
        height: "100vh",

        background: "#ffffff",

        borderRight: "1px solid #e5e7eb",

        padding: 20,

        zIndex: 20,
      }}
    >
      <h2>Workflow Nodes</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          marginTop: 20,
        }}
      >
        {nodeTypes.map((node) => (
          <div
            key={node.type}
            draggable
            onDragStart={(event) => onDragStart(event, node.type)}
            style={{
              padding: 14,

              border: "1px solid #d1d5db",

              borderRadius: 12,

              cursor: "grab",

              background: "#fff",

              boxShadow: "2px 0 8px rgba(0,0,0,0.04)",
            }}
          >
            {node.label}
          </div>
        ))}
      </div>
    </div>
  );
}
