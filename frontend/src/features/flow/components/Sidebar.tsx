import { useWorkflowStore } from "../store/flowStore";

import DelayEditor from "./editors/DelayEditor";
import ConditionEditor from "./editors/ConditionEditor";
import EmailEditor from "./editors/EmailEditor";

export default function WorkflowSidebar() {
  const nodes = useWorkflowStore((state) => state.nodes);

  const selectedNodeId = useWorkflowStore((state) => state.selectedNodeId);

  const setSelectedNodeId = useWorkflowStore(
    (state) => state.setSelectedNodeId,
  );

  const deleteSelectedElements = useWorkflowStore(
    (state) => state.deleteSelectedElements,
  );

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  if (!selectedNode) {
    return null;
  }

  const selectedNodes = nodes.filter((node) => node.selected);

  const deletableNodes = selectedNodes.filter(
    (node) => node.type !== "start" && node.type !== "end",
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,

        width: 240,

        background: "#ffffff",

        borderLeft: "1px solid #e5e7eb",

        overflowY: "auto",

        padding: 20,

        zIndex: 20,

        boxShadow: "-2px 0 8px rgba(0,0,0,0.04)",
      }}
    >
      <h2>{selectedNode.type}</h2>

      {selectedNode.type === "delay" && <DelayEditor node={selectedNode} />}

      {selectedNode.type === "condition" && (
        <ConditionEditor node={selectedNode} />
      )}

      {selectedNode.type === "email" && <EmailEditor node={selectedNode} />}
    </div>
  );
}
