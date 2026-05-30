import { useWorkflowStore } from "../../store/flowStore";

export default function ConditionEditor({ node }: any) {
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div>
        <label>Condition</label>

        <select
          value={node.data?.conditionType ?? "email_known"}
          onChange={(e) => {
            updateNodeData(node.id, {
              conditionType: e.target.value,
            });
          }}
          style={{
            width: "100%",

            marginTop: 8,

            padding: 10,

            borderRadius: 8,

            border: "1px solid #d1d5db",
          }}
        >
          <option value="email_known">Email connu</option>

          <option value="has_whatsapp">WhatsApp disponible</option>

          <option value="email_rejected">Email rejeté</option>
        </select>
      </div>

      <div>
        <label>Branche active</label>

        <select
          value={node.data?.activeBranch ?? "YES"}
          onChange={(e) => {
            updateNodeData(node.id, {
              activeBranch: e.target.value,
            });
          }}
          style={{
            width: "100%",

            marginTop: 8,

            padding: 10,

            borderRadius: 8,

            border: "1px solid #d1d5db",
          }}
        >
          <option value="YES">YES</option>

          <option value="NO">NO</option>
        </select>
      </div>
    </div>
  );
}
