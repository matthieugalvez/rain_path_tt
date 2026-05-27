import {
  Handle,
  Position,
} from '@xyflow/react'

import BaseNode from './BaseNode'

export default function EndNode({
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
        title="🏁 Fin"
        background="#fee2e2"
        selected={selected}
      >
        Fin du workflow
      </BaseNode>
    </div>
  )
}
