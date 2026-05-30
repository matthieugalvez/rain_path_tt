import { Handle, Position } from "@xyflow/react";

import BaseNode from "./BaseNode";

export default function DelayNode({ data, selected }: any) {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{
          width: 12,
          height: 12,
          background: "#2563eb",
        }}
      />

      <BaseNode
        title="⏱ Attente"
        background="#fef3c7"
        selected={selected}
        invalid={data.invalid}
        simulationStatus={data.simulationStatus}
      >
        Attendre {data.days} jours
      </BaseNode>

      <Handle
        type="source"
        position={Position.Right}
        style={{
          width: 12,
          height: 12,
          background: "#2563eb",
        }}
      />
    </div>
  );
}
