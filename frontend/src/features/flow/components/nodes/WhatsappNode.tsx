import { Handle, Position } from "@xyflow/react";

import BaseNode from "./BaseNode";

export default function WhatsappNode({ data, selected }: any) {
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
          background: "#16a34a",
        }}
      />

      <BaseNode
        title="🟢 WhatsApp"
        background="#dcfce7"
        selected={selected}
        invalid={data.invalid}
        simulationStatus={data.simulationStatus}
      >
        Envoi WhatsApp
      </BaseNode>

      <Handle
        type="source"
        position={Position.Right}
        style={{
          width: 12,
          height: 12,
          background: "#16a34a",
        }}
      />
    </div>
  );
}
