import type { Node, Edge } from "@xyflow/react";

export interface ValidationError {
  nodeId?: string;
  message: string;
}

export function validateWorkflow(
  nodes: Node[],
  edges: Edge[],
): ValidationError[] {
  const errors: ValidationError[] = [];

  validateNodeConnections(nodes, edges, errors);

  validateStartToEndPaths(nodes, edges, errors);

  return errors;
}

function validateNodeConnections(
  nodes: Node[],
  edges: Edge[],
  errors: ValidationError[],
) {
  for (const node of nodes) {
    const incoming = edges.filter((edge) => edge.target === node.id);

    const outgoing = edges.filter((edge) => edge.source === node.id);

    switch (node.type) {
      case "start": {
        if (outgoing.length === 0) {
          errors.push({
            nodeId: node.id,

            message: "start sans sortie",
          });
        }

        break;
      }

      case "delay":
      case "email":
      case "sms":
      case "whatsapp":
      case "postal": {
        if (incoming.length === 0) {
          errors.push({
            nodeId: node.id,

            message: `${node.type} sans entrée`,
          });
        }

        if (outgoing.length === 0) {
          errors.push({
            nodeId: node.id,

            message: `${node.type} sans sortie`,
          });
        }

        break;
      }

      case "condition": {
        if (incoming.length === 0) {
          errors.push({
            nodeId: node.id,

            message: "condition sans entrée",
          });
        }

        const hasYes = outgoing.some((edge) => edge.sourceHandle === "yes");

        const hasNo = outgoing.some((edge) => edge.sourceHandle === "no");

        if (!hasYes) {
          errors.push({
            nodeId: node.id,

            message: "condition sans branche YES",
          });
        }

        if (!hasNo) {
          errors.push({
            nodeId: node.id,

            message: "condition sans branche NO",
          });
        }

        break;
      }

      case "end": {
        if (incoming.length === 0) {
          errors.push({
            nodeId: node.id,

            message: "end sans entrée",
          });
        }

        break;
      }
    }
  }
}

function validateStartToEndPaths(
  nodes: Node[],
  edges: Edge[],
  errors: ValidationError[],
) {
  const start = nodes.find((node) => node.type === "start");

  const end = nodes.find((node) => node.type === "end");

  if (!start || !end) {
    return;
  }

  const reachableFromStart = new Set<string>();

  function dfsFromStart(nodeId: string) {
    if (reachableFromStart.has(nodeId)) {
      return;
    }

    reachableFromStart.add(nodeId);

    const outgoing = edges.filter((edge) => edge.source === nodeId);

    for (const edge of outgoing) {
      dfsFromStart(edge.target);
    }
  }

  dfsFromStart(start.id);

  const canReachEnd = new Set<string>();

  function dfsToEnd(nodeId: string) {
    if (canReachEnd.has(nodeId)) {
      return;
    }

    canReachEnd.add(nodeId);

    const incoming = edges.filter((edge) => edge.target === nodeId);

    for (const edge of incoming) {
      dfsToEnd(edge.source);
    }
  }

  dfsToEnd(end.id);

  for (const node of nodes) {
    if (!reachableFromStart.has(node.id)) {
      errors.push({
        nodeId: node.id,

        message: `${node.type} inaccessible depuis le start`,
      });

      continue;
    }

    if (!canReachEnd.has(node.id)) {
      errors.push({
        nodeId: node.id,

        message: `${node.type} ne mène pas au end`,
      });
    }
  }
}

export function getInvalidNodeIds(errors: ValidationError[]): Set<string> {
  return new Set(
    errors
      .filter((error) => error.nodeId)
      .map((error) => error.nodeId as string),
  );
}
