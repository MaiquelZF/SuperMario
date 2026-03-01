import { useCallback, useEffect, useState } from 'react'
import { Tldraw, type Editor, type TLStoreSnapshot } from 'tldraw'
import 'tldraw/tldraw.css'
import { TopToolbar } from '../components/TopToolbar'
import { STORAGE_KEY } from '../domain/constants'
import { loadCanvasState } from '../storage/localCanvasStorage'
import { useCanvasPersistence } from './useCanvasPersistence'
import { useCreateIdeaNode } from './useCreateIdeaNode'
import { useConnectSelectedNodes } from './useConnectSelectedNodes'

export function CanvasBoard() {
  const [editor, setEditor] = useState<Editor | null>(null)
  const createIdeaNode = useCreateIdeaNode(editor)
  const connectSelectedNodes = useConnectSelectedNodes(editor)

  useCanvasPersistence(editor)

  const handleMount = useCallback((nextEditor: Editor) => {
    setEditor(nextEditor)

    const persisted = loadCanvasState(STORAGE_KEY)
    if (persisted?.tldrawSnapshot) {
      nextEditor.store.loadSnapshot(persisted.tldrawSnapshot as TLStoreSnapshot)
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 'n') return

      const activeTag = (document.activeElement as HTMLElement | null)?.tagName
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return

      event.preventDefault()
      createIdeaNode()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [createIdeaNode])

  return (
    <div className="canvas-shell">
      <TopToolbar onCreateIdea={createIdeaNode} onConnectSelected={connectSelectedNodes} />
      <TopToolbar onCreateIdea={createIdeaNode} />
      <div className="canvas-surface">
        <Tldraw onMount={handleMount} />
      </div>
    </div>
  )
}
