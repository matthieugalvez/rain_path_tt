import { Handle, Position } from '@xyflow/react'

import BaseNode from './BaseNode'

export default function EmailNode({ data }: any) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
      />

	  <BaseNode title="📧 Email">
	  	{data.subject}
	  </BaseNode>

      <Handle
        type="source"
        position={Position.Bottom}
      />
    </>
  )
}
