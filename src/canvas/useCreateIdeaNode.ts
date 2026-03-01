import { useCallback } from 'react'
import { createShapeId, type Editor } from 'tldraw'
import { DEFAULT_NODE_TEXT } from '../domain/constants'

/**
 * Creates a new text-capable idea node centered in the current viewport.
 */
export function useCreateIdeaNode(editor: Editor | null): () => void {
  return useCallback(() => {
    if (!editor) return

    const { x, y, w, h } = editor.getViewportPageBounds()
    const nodeWidth = 220
    const nodeHeight = 120

    editor.createShape({
      id: createShapeId(),
      type: 'geo',
      x: x + w / 2 - nodeWidth / 2,
      y: y + h / 2 - nodeHeight / 2,
      props: {
        geo: 'rectangle',
        w: nodeWidth,
        h: nodeHeight,
        dash: 'draw',
        size: 'm',
        color: 'blue',
        fill: 'solid',
        labelColor: 'black',
        text: DEFAULT_NODE_TEXT,
      },
    })
  }, [editor])
}
