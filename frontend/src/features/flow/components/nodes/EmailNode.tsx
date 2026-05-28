import {
  Handle,
  Position,
} from '@xyflow/react'

import BaseNode from './BaseNode'

export default function EmailNode({
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
        title="📧 Email"
        background="#dbeafe"
        selected={selected}
		invalid={data.invalid}
		simulationStatus={
    		data.simulationStatus
		}
      >
        {data.subject || 'Envoi email'}
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
