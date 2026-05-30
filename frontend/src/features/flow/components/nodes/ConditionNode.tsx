import { Handle, Position } from "@xyflow/react";

import BaseNode from "./BaseNode";

import { conditionLabels } from "../../constants/conditionLabels";

export default function ConditionNode({ data, selected }: any) {
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
        title="❓ Condition"
        background="#ffedd5"
        selected={selected}
        invalid={data.invalid}
        simulationStatus={data.simulationStatus}
      >
        {conditionLabels[data.conditionType]}
      </BaseNode>

      <div
        style={{
          position: "absolute",
          right: -40,
          top: "30%",
          fontSize: 12,
          fontWeight: "bold",
        }}
      >
        YES
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="yes"
        style={{
          top: "35%",
          width: 12,
          height: 12,
          background: "#16a34a",
        }}
      />

      <div
        style={{
          position: "absolute",
          right: -35,
          top: "65%",
          fontSize: 12,
          fontWeight: "bold",
        }}
      >
        NO
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="no"
        style={{
          top: "70%",
          width: 12,
          height: 12,
          background: "#dc2626",
        }}
      />
    </div>
  );
}
