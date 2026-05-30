import { ReactFlowProvider } from "@xyflow/react";

import WorkflowEditor from "../features/flow/components/flowEditor";

export default function EditorPage() {
  return (
    <ReactFlowProvider>
      <WorkflowEditor />
    </ReactFlowProvider>
  );
}
