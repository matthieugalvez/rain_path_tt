import {
  Handle,
  Position,
} from '@xyflow/react'

import BaseNode from './BaseNode'

export default function SmsNode({
	data,
  selected,
}: any) {
  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{
          width: 12,
          height: 12,
          background: '#2563eb',
        }}
      />

      <BaseNode
        title="📱 SMS"
        background="#e0f2fe"
        selected={selected}
		invalid={data.invalid}
      >
        Envoi SMS
      </BaseNode>

      <Handle
        type="source"
        position={Position.Right}
        style={{
          width: 12,
          height: 12,
          background: '#2563eb',
        }}
      />
    </div>
  )
}
