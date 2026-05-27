import { Handle, Position } from '@xyflow/react'

import BaseNode from './BaseNode'

export default function DelayNode({ data }: any) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
      />

      <BaseNode
        title="⏱ Attente"
        background="#fff8dc"
      >
        <div>
          {data.days} jours
        </div>
      </BaseNode>

      <Handle
        type="source"
        position={Position.Bottom}
      />
    </>
  )
}
