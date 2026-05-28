import {
  useMemo,
  useState,
} from 'react'

import { useWorkflowStore }
from '../store/flowStore'

export default function WorkflowSimulationPanel() {
  const nodes =
    useWorkflowStore(
      (state) => state.nodes
    )

  const edges =
    useWorkflowStore(
      (state) => state.edges
    )

  const setSimulationState =
    useWorkflowStore(
      (state) =>
        state.setSimulationState
    )

  const orderedNodes =
    useMemo(() => {
      const start =
        nodes.find(
          (node) =>
            node.type ===
            'start'
        )

      if (!start) {
        return []
      }

      const result = []

      let current = start

      const visited =
        new Set<string>()

      while (
        current &&
        !visited.has(
          current.id
        )
      ) {
        visited.add(current.id)

        result.push(current)

        const edge =
          edges.find(
            (edge) =>
              edge.source ===
              current.id
          )

        if (!edge) {
          break
        }

        current =
          nodes.find(
            (node) =>
              node.id ===
              edge.target
          )
      }

      return result
    }, [nodes, edges])

  const [index, setIndex] =
    useState(0)

  function simulate() {
    const current =
      orderedNodes[index]

    if (!current) {
      return
    }

    const completed =
      orderedNodes
        .slice(0, index)
        .map(
          (node) =>
            node.id
        )

    const activeEdges =
      edges
        .filter(
          (edge) =>
            edge.source ===
            current.id
        )
        .map(
          (edge) =>
            edge.id
        )

    setSimulationState(
      current.id,

      completed,

      activeEdges
    )

    if (
      index <
      orderedNodes.length - 1
    ) {
      setIndex(index + 1)
    }
  }

  function reset() {
    setIndex(0)

    setSimulationState(
      null,
      [],
      []
    )
  }

  return (
    <div
      style={{
        position: 'absolute',

        bottom: 20,
        left: 280,

        background:
          '#ffffff',

        border:
          '1px solid #e5e7eb',

        borderRadius: 12,

        padding: 16,

        zIndex: 50,

        display: 'flex',

        gap: 10,
      }}
    >
      <button
        onClick={simulate}
      >
        Next Step
      </button>

      <button
        onClick={reset}
      >
        Reset
      </button>
    </div>
  )
}
