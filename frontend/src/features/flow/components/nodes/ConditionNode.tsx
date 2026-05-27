import {
  Handle,
  Position,
} from '@xyflow/react'

import BaseNode from './BaseNode'

export default function ConditionNode({
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
        position={Position.Top}
      />

      <BaseNode
        title="❓ Condition"
        background="#ffedd5"
        selected={selected}
      >
        {data.conditionType}
      </BaseNode>

      <div
        style={{
          position: 'absolute',
          right: -45,
          top: '45%',
          fontSize: 12,
          fontWeight: 'bold',
        }}
      >
        YES
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="yes"
      />

      <div
        style={{
          position: 'absolute',
          bottom: -22,
          left: '45%',
          fontSize: 12,
          fontWeight: 'bold',
        }}
      >
        NO
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        id="no"
      />
    </div>
  )
}
