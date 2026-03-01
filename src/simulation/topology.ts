import type { GateNode, WireEdge } from '../types/circuit'

export interface EdgeMap {
  // For each target node+handle, what source node+handle drives it?
  targetToSource: Map<string, { nodeId: string; handle: string }>
  // For each source node+handle, what target node+handles does it drive?
  sourceToTargets: Map<string, Array<{ nodeId: string; handle: string }>>
}

export function buildEdgeMap(edges: WireEdge[]): EdgeMap {
  const targetToSource = new Map<string, { nodeId: string; handle: string }>()
  const sourceToTargets = new Map<string, Array<{ nodeId: string; handle: string }>>()

  for (const edge of edges) {
    if (!edge.source || !edge.target) continue
    const srcHandle = edge.sourceHandle ?? 'out0'
    const tgtHandle = edge.targetHandle ?? 'in0'

    const srcKey = `${edge.source}::${srcHandle}`
    const tgtKey = `${edge.target}::${tgtHandle}`

    targetToSource.set(tgtKey, { nodeId: edge.source, handle: srcHandle })

    if (!sourceToTargets.has(srcKey)) sourceToTargets.set(srcKey, [])
    sourceToTargets.get(srcKey)!.push({ nodeId: edge.target, handle: tgtHandle })
  }

  return { targetToSource, sourceToTargets }
}

/** Kahn's algorithm — returns nodes in evaluation order. Cyclic nodes are appended last. */
export function topoSort(nodes: GateNode[], edges: WireEdge[]): GateNode[] {
  const { targetToSource } = buildEdgeMap(edges)

  // Count how many input handles of each node are driven by another node
  const indegree = new Map<string, number>()
  for (const node of nodes) indegree.set(node.id, 0)

  for (const [tgtKey, { nodeId: srcId }] of targetToSource) {
    const [tgtNodeId] = tgtKey.split('::')
    if (srcId !== tgtNodeId && indegree.has(tgtNodeId)) {
      indegree.set(tgtNodeId, indegree.get(tgtNodeId)! + 1)
    }
  }

  const queue: GateNode[] = nodes.filter(n => indegree.get(n.id) === 0)
  const order: GateNode[] = []
  const visited = new Set<string>()

  while (queue.length > 0) {
    const node = queue.shift()!
    if (visited.has(node.id)) continue
    visited.add(node.id)
    order.push(node)

    // Use edges to find downstream
    for (const edge of edges) {
      if (edge.source !== node.id) continue
      const tgtNodeId = edge.target
      if (!tgtNodeId || visited.has(tgtNodeId)) continue
      const newDeg = (indegree.get(tgtNodeId) ?? 1) - 1
      indegree.set(tgtNodeId, newDeg)
      if (newDeg <= 0) {
        const tgtNode = nodes.find(n => n.id === tgtNodeId)
        if (tgtNode) queue.push(tgtNode)
      }
    }
  }

  // Append any cyclic nodes not yet visited (will produce null signals)
  for (const node of nodes) {
    if (!visited.has(node.id)) order.push(node)
  }

  return order
}
