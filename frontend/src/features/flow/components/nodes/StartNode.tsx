import {
  Handle,
  Position,
} from '@xyflow/react'

import BaseNode from './BaseNode'

export default function StartNode({
	data,
  selected,
}: any) {
  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <BaseNode
        title="🚀 Départ"
        background="#dcfce7"
        selected={selected}
		invalid={data.invalid}
      >
        Examen effectué
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
