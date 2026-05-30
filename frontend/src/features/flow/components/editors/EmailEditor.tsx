import { useWorkflowStore } from "../../store/flowStore";

export default function EmailEditor({ node }: any) {
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div>
        <label>Sujet</label>

        <input
          type="text"
          value={node.data.subject}
          onChange={(e) => {
            updateNodeData(node.id, {
              subject: e.target.value,
            });
          }}
        />
      </div>

      <div>
        <label>Message</label>

        <textarea
          value={node.data.body}
          onChange={(e) => {
            updateNodeData(node.id, {
              body: e.target.value,
            });
          }}
        />
      </div>
    </div>
  );
}
