import type { TutorialTrack } from '../../types/tutorial'
import { useTutorialStore } from '../../store/tutorialStore'
import { getTutorialsForTrack } from '../../tutorials/tracks'

interface TrackCardProps {
  track: TutorialTrack
  onSelect: () => void
}

export function TrackCard({ track, onSelect }: TrackCardProps) {
  const progress = useTutorialStore(s => s.progress)
  const isAccessible = useTutorialStore(s => s.isTrackAccessible(track.id))
  const tutorials = getTutorialsForTrack(track.id)
  const completed = tutorials.filter(t => progress.completedTutorials.includes(t.id)).length
  const total = tutorials.length
  const allDone = completed === total && total > 0
  const pct = total > 0 ? (completed / total) * 100 : 0
  const trackNum = String(track.order).padStart(2, '0')

  const accentColor = allDone ? '#22c55e' : '#8b5cf6'

  return (
    <button
      onClick={isAccessible ? onSelect : undefined}
      disabled={!isAccessible}
      style={{
        display: 'flex',
        alignItems: 'stretch',
        gap: 0,
        padding: 0,
        background: isAccessible ? 'var(--bg-surface)' : '#0c0f16',
        border: 'none',
        borderRadius: 10,
        overflow: 'hidden',
        cursor: isAccessible ? 'pointer' : 'not-allowed',
        opacity: isAccessible ? 1 : 0.35,
        textAlign: 'left',
        transition: 'all 0.2s ease',
        width: '100%',
        boxShadow: `inset 0 0 0 1px ${allDone ? 'rgba(34,197,94,0.2)' : 'var(--border-dim)'}`,
      }}
      onMouseEnter={e => {
        if (isAccessible) {
          e.currentTarget.style.boxShadow = `inset 0 0 0 1px ${allDone ? 'rgba(34,197,94,0.4)' : 'rgba(139,92,246,0.3)'}, 0 8px 32px rgba(0,0,0,0.25)`
          e.currentTarget.style.transform = 'translateY(-2px)'
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = `inset 0 0 0 1px ${allDone ? 'rgba(34,197,94,0.2)' : 'var(--border-dim)'}`
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Left accent strip with track number */}
      <div style={{
        width: 56,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        background: allDone
          ? 'rgba(34,197,94,0.06)'
          : isAccessible
            ? 'rgba(139,92,246,0.05)'
            : 'transparent',
        borderRight: `1px solid ${allDone ? 'rgba(34,197,94,0.15)' : 'var(--border-dim)'}`,
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 18,
          color: allDone ? '#22c55e' : isAccessible ? '#a78bfa' : 'var(--text-dim)',
          letterSpacing: '0.04em',
          lineHeight: 1,
        }}>
          {allDone ? '✓' : trackNum}
        </div>
      </div>

      {/* Content area */}
      <div style={{ flex: 1, padding: '16px 18px', minWidth: 0 }}>
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: 4,
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 14,
            color: allDone ? '#22c55e' : 'var(--text-bright)',
            letterSpacing: '0.04em',
            lineHeight: 1.3,
          }}>
            {track.name}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: allDone ? '#22c55e' : 'var(--text-dim)',
            flexShrink: 0,
            marginLeft: 12,
          }}>
            {completed}/{total}
          </div>
        </div>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'var(--text-dim)',
          lineHeight: 1.5,
          marginBottom: 12,
        }}>
          {track.description}
        </div>

        {/* Progress bar */}
        <div style={{
          height: 3,
          borderRadius: 2,
          background: 'rgba(255,255,255,0.04)',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${pct}%`,
            background: allDone
              ? 'linear-gradient(90deg, #22c55e, #4ade80)'
              : `linear-gradient(90deg, ${accentColor}, #a78bfa)`,
            borderRadius: 2,
            transition: 'width 0.4s ease',
          }} />
        </div>
      </div>
    </button>
  )
}
