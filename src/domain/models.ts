/**
 * Explicit domain models for persistence and future non-editor integrations.
 * These are intentionally separate from tldraw internal records.
 */
export interface IdeaNode {
  id: string
  text: string
  x: number
  y: number
  width: number
  height: number
}

export interface Connection {
  id: string
  fromNodeId: string
  toNodeId: string
}

export interface CanvasDocument {
  nodes: IdeaNode[]
  connections: Connection[]
}
