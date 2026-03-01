import type { CanvasDocument, Connection, IdeaNode } from '../domain/models'

type AnyRecord = Record<string, unknown>

const SHAPE_TYPE_GEO = 'geo'
const SHAPE_TYPE_ARROW = 'arrow'

function asNumber(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0
}

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
}

/**
 * Maps a tldraw snapshot to explicit domain models.
 * This keeps business-level state independent from tldraw internals.
 */
export function mapSnapshotToCanvasDocument(snapshot: unknown): CanvasDocument {
  const store = (snapshot as AnyRecord | undefined)?.store
  const records = (store as AnyRecord | undefined)
    ? Object.values(store as Record<string, unknown>)
    : []

  const nodes: IdeaNode[] = []
  const connections: Connection[] = []

  for (const record of records) {
    const rec = record as AnyRecord
    if (rec.typeName !== 'shape') continue

    const id = asString(rec.id)
    const x = asNumber(rec.x)
    const y = asNumber(rec.y)
    const props = (rec.props as AnyRecord | undefined) ?? {}

    if (rec.type === SHAPE_TYPE_GEO) {
      const text = asString(props.text, '')
      const width = asNumber(props.w)
      const height = asNumber(props.h)

      nodes.push({ id, text, x, y, width, height })
      continue
    }

    if (rec.type === SHAPE_TYPE_ARROW) {
      const start = (props.start as AnyRecord | undefined)?.boundShapeId
      const end = (props.end as AnyRecord | undefined)?.boundShapeId

      if (typeof start === 'string' && typeof end === 'string') {
        connections.push({
          id,
          fromNodeId: start,
          toNodeId: end,
        })
      }
    }
  }

  return { nodes, connections }
}
