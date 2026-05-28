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

	validateNodeConnections(
  		nodes,
  		edges,
  		errors
	)

	validateAllPathsEnd(
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

function validateNodeConnections(
  nodes: Node[],
  edges: Edge[],
  errors: ValidationError[]
) {
  for (const node of nodes) {
    const incoming =
      edges.filter(
        (edge) =>
          edge.target === node.id
      )

    const outgoing =
      edges.filter(
        (edge) =>
          edge.source === node.id
      )

    switch (node.type) {
      case 'start': {
        if (outgoing.length === 0) {
          errors.push({
            nodeId: node.id,

            message:
              'Le node Start doit avoir une sortie',
          })
        }

        break
      }

      case 'delay':
      case 'email':
      case 'sms':
      case 'whatsapp':
      case 'postal': {
        if (incoming.length === 0) {
          errors.push({
            nodeId: node.id,

            message:
              `${node.type} doit avoir une entrée`,
          })
        }

        if (outgoing.length === 0) {
          errors.push({
            nodeId: node.id,

            message:
              `${node.type} doit avoir une sortie`,
          })
        }

        break
      }

      case 'condition': {
        if (incoming.length === 0) {
          errors.push({
            nodeId: node.id,

            message:
              'Condition sans entrée',
          })
        }

        const hasYes =
          outgoing.some(
            (edge) =>
              edge.sourceHandle ===
              'yes'
          )

        const hasNo =
          outgoing.some(
            (edge) =>
              edge.sourceHandle ===
              'no'
          )

        if (!hasYes) {
          errors.push({
            nodeId: node.id,

            message:
              'Condition sans branche YES',
          })
        }

        if (!hasNo) {
          errors.push({
            nodeId: node.id,

            message:
              'Condition sans branche NO',
          })
        }

        break
      }

      case 'end': {
        if (incoming.length === 0) {
          errors.push({
            nodeId: node.id,

            message:
              'Node End sans entrée',
          })
        }

        break
      }
    }
  }
}

function validateAllPathsEnd(
  nodes: Node[],
  edges: Edge[],
  errors: ValidationError[]
) {
  const start =
    nodes.find(
      (node) =>
        node.type === 'start'
    )

  if (!start) {
    return
  }

  const visited =
    new Set<string>()

  function dfs(nodeId: string) {
    if (visited.has(nodeId)) {
      return
    }

    visited.add(nodeId)

    const node = nodes.find(
      (n) => n.id === nodeId
    )

    if (!node) {
      return
    }

    if (node.type === 'end') {
      return
    }

    const outgoing =
      edges.filter(
        (edge) =>
          edge.source === nodeId
      )

    if (outgoing.length === 0) {
      errors.push({
        nodeId,

        message:
          'Une branche ne termine pas sur un node End',
      })

      return
    }

    for (const edge of outgoing) {
      dfs(edge.target)
    }
  }

  dfs(start.id)
}

export function getInvalidNodeIds(
  errors: ValidationError[]
): Set<string> {
  return new Set(
    errors
      .filter(
        (error) => error.nodeId
      )
      .map(
        (error) =>
          error.nodeId as string
      )
  )
}
