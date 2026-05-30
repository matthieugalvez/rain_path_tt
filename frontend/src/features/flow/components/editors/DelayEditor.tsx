import { useWorkflowStore } from "../../store/flowStore";

export default function DelayEditor({ node }: any) {
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData);

  return (
    <div>
      <label>Nombre de jours</label>

      <input
        type="number"
        value={node.data.days}
        onChange={(e) => {
          updateNodeData(node.id, {
            days: Number(e.target.value),
          });
        }}
      />
    </div>
  );
}
