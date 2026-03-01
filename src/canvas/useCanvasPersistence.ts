import { useEffect, useRef } from 'react'
import type { Editor } from 'tldraw'
import { SAVE_DEBOUNCE_MS, STORAGE_KEY } from '../domain/constants'
import { mapSnapshotToCanvasDocument } from './tldrawMapping'
import { saveCanvasState } from '../storage/localCanvasStorage'

/**
 * Subscribes to editor changes and persists both:
 * 1) Full tldraw snapshot for exact reconstruction.
 * 2) Explicit domain document for architecture clarity/extensibility.
 */
export function useCanvasPersistence(editor: Editor | null): void {
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (!editor) return

    const dispose = editor.store.listen(() => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = window.setTimeout(() => {
        const snapshot = editor.store.getSnapshot()
        const document = mapSnapshotToCanvasDocument(snapshot)

        saveCanvasState(STORAGE_KEY, {
          version: 1,
          tldrawSnapshot: snapshot,
          document,
        })
      }, SAVE_DEBOUNCE_MS)
    })

    return () => {
      dispose()
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [editor])
}
