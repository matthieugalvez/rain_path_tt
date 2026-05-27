import { Handle, Position } from '@xyflow/react'

import BaseNode from './BaseNode'

export default function StartNode() {
  return (
    <>
      <BaseNode
        title="🚀 Départ"
        background="#d4f8d4"
      >
        Examen effectué
      </BaseNode>

      <Handle
        type="source"
        position={Position.Bottom}
      />
    </>
  )
}
