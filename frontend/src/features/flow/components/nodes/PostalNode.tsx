import {
  Handle,
  Position,
} from '@xyflow/react'

import BaseNode from './BaseNode'

export default function PostalNode({
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
          background: '#92400e',
        }}
      />

      <BaseNode
        title="📮 Courrier"
        background="#fef3c7"
        selected={selected}
		invalid={data.invalid}
		simulationStatus={
    		data.simulationStatus
		}
      >
        Courrier postal
      </BaseNode>

      <Handle
        type="source"
        position={Position.Right}
        style={{
          width: 12,
          height: 12,
          background: '#92400e',
        }}
      />
    </div>
  )
}
