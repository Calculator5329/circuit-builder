import type { TutorialTrack } from '../../types/tutorial'
import { useTutorialStore } from '../../store/tutorialStore'
import { getTutorialsForTrack } from '../../tutorials/tracks'

const TRACK_ICONS: Record<string, string> = {
  'introduction':        '01',
  'arithmetic':          '+',
  'multibit-arithmetic': '4b',
  'multiplexing':        'Mx',
  'encoding':            'En',
  'comparison':          '<>',
  'alu':                 'AL',
  'display':             '7s',
}

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

  return (
    <button
      onClick={isAccessible ? onSelect : undefined}
      disabled={!isAccessible}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: '16px 18px',
        background: isAccessible ? 'var(--bg-surface)' : '#0c0f16',
        border: 'none',
        borderRadius: 6,
        boxShadow: allDone
          ? 'inset 0 0 0 1px #166534, 0 0 12px rgba(34,197,94,0.08)'
          : isAccessible
            ? 'inset 0 0 0 1px var(--border-mid)'
            : 'inset 0 0 0 1px var(--border-dim)',
        cursor: isAccessible ? 'pointer' : 'not-allowed',
        opacity: isAccessible ? 1 : 0.4,
        textAlign: 'left',
        transition: 'box-shadow 0.15s, background 0.15s, transform 0.12s',
        width: '100%',
      }}
      onMouseEnter={e => {
        if (isAccessible && !allDone) {
          e.currentTarget.style.boxShadow = 'inset 0 0 0 1px var(--border-hi), 0 0 16px rgba(139,92,246,0.08)'
          e.currentTarget.style.transform = 'translateY(-1px)'
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = allDone
          ? 'inset 0 0 0 1px #166534, 0 0 12px rgba(34,197,94,0.08)'
          : isAccessible
            ? 'inset 0 0 0 1px var(--border-mid)'
            : 'inset 0 0 0 1px var(--border-dim)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div className="flex items-center gap-3">
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 4,
          background: allDone ? '#052e16' : 'var(--bg-panel)',
          border: `1px solid ${allDone ? '#166534' : 'var(--border-dim)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontSize: 13,
          color: allDone ? '#22c55e' : 'var(--text-dim)',
          flexShrink: 0,
        }}>
          {TRACK_ICONS[track.id] ?? '#'}
        </div>

        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 13,
            color: allDone ? '#22c55e' : 'var(--text-bright)',
            letterSpacing: '0.04em',
            lineHeight: 1.3,
          }}>
            {track.name}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--text-dim)',
            lineHeight: 1.4,
            marginTop: 2,
          }}>
            {track.description}
          </div>
        </div>

        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 10,
          color: allDone ? '#22c55e' : 'var(--text-dim)',
          letterSpacing: '0.06em',
          flexShrink: 0,
        }}>
          {completed}/{total}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        height: 2,
        borderRadius: 1,
        background: 'var(--border-dim)',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: allDone ? '#22c55e' : '#8b5cf6',
          borderRadius: 1,
          transition: 'width 0.3s ease',
        }} />
      </div>
    </button>
  )
}
