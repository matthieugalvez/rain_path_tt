import { useWorkflowStore } from '../store/flowStore'

const nodeButtons = [
  {
    type: 'delay',
    label: '⏱ Delay',
  },

  {
    type: 'condition',
    label: '❓ Condition',
  },

  {
    type: 'email',
    label: '📧 Email',
  },

  {
    type: 'sms',
    label: '📱 SMS',
  },

  {
    type: 'whatsapp',
    label: '🟢 WhatsApp',
  },

  {
    type: 'postal',
    label: '📮 Courrier',
  },

  {
    type: 'end',
    label: '🏁 Fin',
  },
]

export default function WorkflowToolbar() {
  const addNode =
    useWorkflowStore(
      (state) => state.addNode
    )

  return (
    <div
      style={{
        position: 'absolute',
        top: 20,
        left: 20,

        zIndex: 20,

        display: 'flex',
        gap: 10,

        padding: 12,

        background: 'white',

        borderRadius: 16,

        boxShadow:
          '0 4px 12px rgba(0,0,0,0.12)',
      }}
    >
      {nodeButtons.map((button) => (
        <button
          key={button.type}
          onClick={() =>
            addNode(button.type)
          }

          style={{
            padding: '10px 14px',
            borderRadius: 10,
            border:
              '1px solid #d1d5db',
            background: '#fff',
            cursor: 'pointer',
          }}
        >
          {button.label}
        </button>
      ))}
    </div>
  )
}
