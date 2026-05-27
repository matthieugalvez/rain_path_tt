import { useWorkflowStore } from '../../store/flowStore'

export default function ConditionEditor({
  node,
}: any) {
  const updateNodeData =
    useWorkflowStore(
      (state) =>
        state.updateNodeData
    )

  return (
    <div>
      <label>
        Condition
      </label>

      <select
        value={
          node.data.conditionType
        }

        onChange={(e) => {
          updateNodeData(node.id, {
            conditionType:
              e.target.value,
          })
        }}
      >
        <option value="email_known">
          Email connu
        </option>

        <option value="has_whatsapp">
          WhatsApp disponible
        </option>

        <option value="email_rejected">
          Email rejeté
        </option>
      </select>
    </div>
  )
}
