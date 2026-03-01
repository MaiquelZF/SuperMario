interface TopToolbarProps {
  onCreateIdea: () => void
}

export function TopToolbar({ onCreateIdea }: TopToolbarProps) {
  return (
    <div className="top-toolbar" role="toolbar" aria-label="Canvas actions">
      <button type="button" className="primary-button" onClick={onCreateIdea}>
        New Idea
      </button>
      <span className="shortcut-hint">Shortcut: N</span>
    </div>
  )
}
