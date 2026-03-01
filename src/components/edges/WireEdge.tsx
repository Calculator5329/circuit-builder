import { getBezierPath, type EdgeProps } from '@xyflow/react'
import type { WireEdgeData } from '../../types/circuit'

export function WireEdge({
  id,
  sourceX, sourceY, sourcePosition,
  targetX, targetY, targetPosition,
  data,
  selected,
}: EdgeProps) {
  const wireData = data as WireEdgeData | undefined
  const [path] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition })
  const signal = wireData?.signal ?? null

  let stroke: string
  let strokeWidth: number
  let strokeDasharray: string | undefined
  let filterClass: string | undefined

  if (selected) {
    stroke = '#ffb300'
    strokeWidth = 2.5
    filterClass = undefined
  } else if (signal === 1) {
    stroke = '#00ff41'
    strokeWidth = 2.5
    filterClass = 'wire-high'
  } else if (signal === 0) {
    stroke = '#1a3a1a'
    strokeWidth = 1.5
    filterClass = undefined
  } else {
    stroke = '#ffb300'
    strokeWidth = 1.5
    strokeDasharray = '5 4'
    filterClass = undefined
  }

  return (
    <>
      {/* Wide invisible hit area */}
      <path
        id={id}
        d={path}
        fill="none"
        strokeWidth={14}
        stroke="transparent"
        className="react-flow__edge-interaction"
      />
      {/* Visible wire */}
      <path
        d={path}
        fill="none"
        strokeWidth={strokeWidth}
        stroke={stroke}
        strokeDasharray={strokeDasharray}
        strokeLinecap="round"
        className={`react-flow__edge-path${filterClass ? ` ${filterClass}` : ''}`}
        style={{ opacity: signal === 0 ? 0.55 : 1 }}
      />
    </>
  )
}
