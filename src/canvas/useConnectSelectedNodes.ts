import { useCallback } from 'react'
import { createShapeId, type Editor } from 'tldraw'

/**
 * Creates a connector (arrow) between the first two selected idea nodes.
 *
 * Architectural note:
 * - We intentionally bind the arrow terminals to shapes so connection semantics
 *   remain stable when nodes move and are also recoverable in the domain mapper.
 */
export function useConnectSelectedNodes(editor: Editor | null): () => void {
  return useCallback(() => {
    if (!editor) return

    const selectedNodes = editor
      .getSelectedShapes()
      .filter((shape: { type: string }) => shape.type === 'geo')

    if (selectedNodes.length < 2) return

    const [fromNode, toNode] = selectedNodes as Array<{
      id: string
      x: number
      y: number
      props?: Record<string, unknown>
    }>

    const fromWidth = typeof fromNode.props?.w === 'number' ? fromNode.props.w : 220
    const fromHeight = typeof fromNode.props?.h === 'number' ? fromNode.props.h : 120
    const toWidth = typeof toNode.props?.w === 'number' ? toNode.props.w : 220
    const toHeight = typeof toNode.props?.h === 'number' ? toNode.props.h : 120

    const fromCenterX = fromNode.x + fromWidth / 2
    const fromCenterY = fromNode.y + fromHeight / 2
    const toCenterX = toNode.x + toWidth / 2
    const toCenterY = toNode.y + toHeight / 2

    const originX = Math.min(fromCenterX, toCenterX)
    const originY = Math.min(fromCenterY, toCenterY)

    editor.createShape({
      id: createShapeId(),
      type: 'arrow',
      x: originX,
      y: originY,
      props: {
        start: {
          type: 'binding',
          boundShapeId: fromNode.id,
          normalizedAnchor: { x: 0.5, y: 0.5 },
          isExact: false,
        },
        end: {
          type: 'binding',
          boundShapeId: toNode.id,
          normalizedAnchor: { x: 0.5, y: 0.5 },
          isExact: false,
        },
        bend: 0,
        arrowheadStart: 'none',
        arrowheadEnd: 'arrow',
        color: 'blue',
      },
    })
  }, [editor])
}
