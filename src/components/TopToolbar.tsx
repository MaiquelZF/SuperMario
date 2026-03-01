interface TopToolbarProps {
  onCreateIdea: () => void
  onConnectSelected: () => void
}

export function TopToolbar({ onCreateIdea, onConnectSelected }: TopToolbarProps) {
}

export function TopToolbar({ onCreateIdea }: TopToolbarProps) {
  return (
    <div className="top-toolbar" role="toolbar" aria-label="Canvas actions">
      <button type="button" className="primary-button" onClick={onCreateIdea}>
        New Idea
      </button>
      <button type="button" className="secondary-button" onClick={onConnectSelected}>
        Connect Nodes
      </button>
      <span className="shortcut-hint">Shortcut: N (new idea)</span>
      <span className="shortcut-hint">Shortcut: N</span>
    </div>
  )
}
