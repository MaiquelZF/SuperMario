import type { CanvasDocument } from '../domain/models'

interface PersistedCanvasState {
  version: 1
  tldrawSnapshot: unknown
  document: CanvasDocument
}

export function loadCanvasState(storageKey: string): PersistedCanvasState | null {
  try {
    const raw = localStorage.getItem(storageKey)
    if (!raw) return null

    const parsed = JSON.parse(raw) as PersistedCanvasState
    if (parsed?.version !== 1) return null

    if (!parsed.document || !Array.isArray(parsed.document.nodes) || !Array.isArray(parsed.document.connections)) {
      return null
    }

    return parsed
  } catch {
    return null
  }
}

export function saveCanvasState(storageKey: string, state: PersistedCanvasState): void {
  localStorage.setItem(storageKey, JSON.stringify(state))
}

export type { PersistedCanvasState }
