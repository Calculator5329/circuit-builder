import type { TutorialDefinition } from '../../types/tutorial'
import { useTutorialStore } from '../../store/tutorialStore'

interface TutorialCardProps {
  tutorial: TutorialDefinition
  onStart: () => void
}

export function TutorialCard({ tutorial, onStart }: TutorialCardProps) {
  const progress = useTutorialStore(s => s.progress)
  const isUnlocked = useTutorialStore(s => s.isTutorialUnlocked(tutorial.id))
  const isCompleted = progress.completedTutorials.includes(tutorial.id)

  const difficultyDots = Array.from({ length: 5 }, (_, i) => i < tutorial.difficulty)

  return (
    <button
      onClick={isUnlocked ? onStart : undefined}
      disabled={!isUnlocked}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        width: '100%',
        padding: '10px 14px',
        background: isUnlocked ? 'var(--bg-surface)' : '#0c0f16',
        border: 'none',
        borderRadius: 4,
        boxShadow: isCompleted
          ? 'inset 0 0 0 1px #166534'
          : isUnlocked
            ? 'inset 0 0 0 1px var(--border-mid)'
            : 'inset 0 0 0 1px var(--border-dim)',
        cursor: isUnlocked ? 'pointer' : 'not-allowed',
        opacity: isUnlocked ? 1 : 0.35,
        textAlign: 'left',
        transition: 'box-shadow 0.12s, background 0.12s',
      }}
      onMouseEnter={e => {
        if (isUnlocked && !isCompleted)
          e.currentTarget.style.boxShadow = 'inset 0 0 0 1px var(--border-hi)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = isCompleted
          ? 'inset 0 0 0 1px #166534'
          : isUnlocked
            ? 'inset 0 0 0 1px var(--border-mid)'
            : 'inset 0 0 0 1px var(--border-dim)'
      }}
    >
      {/* Status indicator */}
      <div style={{
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: isCompleted ? '#052e16' : 'var(--bg-panel)',
        border: `1px solid ${isCompleted ? '#22c55e' : isUnlocked ? 'var(--border-mid)' : 'var(--border-dim)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontFamily: 'var(--font-display)',
        fontSize: 10,
        color: isCompleted ? '#22c55e' : isUnlocked ? 'var(--text-dim)' : 'var(--text-dim)',
      }}>
        {isCompleted ? '\u2713' : !isUnlocked ? '\u{1F512}' : tutorial.order}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 12,
          color: isCompleted ? '#22c55e' : 'var(--text-bright)',
          letterSpacing: '0.04em',
          lineHeight: 1.3,
        }}>
          {tutorial.name}
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'var(--text-dim)',
          lineHeight: 1.3,
          marginTop: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {tutorial.description}
        </div>
      </div>

      {/* Difficulty */}
      <div className="flex gap-0.5" style={{ flexShrink: 0 }}>
        {difficultyDots.map((filled, i) => (
          <div key={i} style={{
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: filled ? '#8b5cf6' : 'var(--border-dim)',
          }} />
        ))}
      </div>

      {/* Unlock badge */}
      {tutorial.unlocksComponent && (
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 8,
          color: isCompleted ? '#22c55e' : '#8b5cf6',
          letterSpacing: '0.08em',
          padding: '2px 6px',
          borderRadius: 2,
          background: isCompleted ? '#052e16' : 'rgba(139,92,246,0.1)',
          border: `1px solid ${isCompleted ? '#166534' : 'rgba(139,92,246,0.2)'}`,
          flexShrink: 0,
          whiteSpace: 'nowrap',
        }}>
          {isCompleted ? 'UNLOCKED' : 'UNLOCKS'}
        </div>
      )}
    </button>
  )
}
