import type {
  Node,
  Edge,
} from '@xyflow/react'

export interface ValidationError {
  nodeId?: string
  message: string
}

export function validateWorkflow(
  nodes: Node[],
  edges: Edge[]
): ValidationError[] {
  const errors: ValidationError[] = []

  validateStartNode(nodes, errors)

  validateEndNode(nodes, errors)

  validateConditionNodes(
    nodes,
    edges,
    errors
  )

  validateOrphanNodes(
    nodes,
    edges,
    errors
  )

  return errors
}

function validateStartNode(
  nodes: Node[],
  errors: ValidationError[]
) {
  const starts = nodes.filter(
    (node) =>
      node.type === 'start'
  )

  if (starts.length === 0) {
    errors.push({
      message:
        'Le workflow doit avoir un node Start',
    })
  }

  if (starts.length > 1) {
    errors.push({
      message:
        'Un seul node Start est autorisé',
    })
  }
}

function validateEndNode(
  nodes: Node[],
  errors: ValidationError[]
) {
  const ends = nodes.filter(
    (node) =>
      node.type === 'end'
  )

  if (ends.length === 0) {
    errors.push({
      message:
        'Le workflow doit avoir un node End',
    })
  }
}

function validateConditionNodes(
  nodes: Node[],
  edges: Edge[],
  errors: ValidationError[]
) {
  const conditions = nodes.filter(
    (node) =>
      node.type === 'condition'
  )

  for (const node of conditions) {
    const outgoingEdges =
      edges.filter(
        (edge) =>
          edge.source === node.id
      )

    const hasYes =
      outgoingEdges.some(
        (edge) =>
          edge.sourceHandle ===
          'yes'
      )

    const hasNo =
      outgoingEdges.some(
        (edge) =>
          edge.sourceHandle ===
          'no'
      )

    if (!hasYes || !hasNo) {
      errors.push({
        nodeId: node.id,

        message:
          'La condition doit avoir une sortie YES et NO',
      })
    }
  }
}

function validateOrphanNodes(
  nodes: Node[],
  edges: Edge[],
  errors: ValidationError[]
) {
  for (const node of nodes) {
    if (node.type === 'start') {
      continue
    }

    const hasIncoming =
      edges.some(
        (edge) =>
          edge.target === node.id
      )

    if (!hasIncoming) {
      errors.push({
        nodeId: node.id,

        message:
          'Node non relié',
      })
    }
  }
}
