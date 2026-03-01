import { useState } from 'react'
import { useTutorialStore } from '../../store/tutorialStore'
import { TRACKS, getTutorialsForTrack } from '../../tutorials/tracks'
import { TrackCard } from './TrackCard'
import { TutorialCard } from './TutorialCard'
import { Button } from '../ui/Button'
import type { TutorialTrack } from '../../types/tutorial'

export function TutorialHub() {
  const setView = useTutorialStore(s => s.setView)
  const startTutorial = useTutorialStore(s => s.startTutorial)
  const progress = useTutorialStore(s => s.progress)
  const [selectedTrack, setSelectedTrack] = useState<TutorialTrack | null>(null)

  const totalCompleted = progress.completedTutorials.length
  const totalTutorials = TRACKS.reduce((sum, t) => sum + getTutorialsForTrack(t.id).length, 0)

  if (selectedTrack) {
    const tutorials = getTutorialsForTrack(selectedTrack.id)
    return (
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg-canvas)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 20px',
          borderBottom: '1px solid var(--border-mid)',
          background: 'var(--bg-panel)',
        }}>
          <Button variant="ghost" size="sm" onClick={() => setSelectedTrack(null)}>
            &larr; Back
          </Button>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 14,
            color: 'var(--text-bright)',
            letterSpacing: '0.04em',
          }}>
            {selectedTrack.name}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--text-dim)',
            marginLeft: 'auto',
          }}>
            {tutorials.filter(t => progress.completedTutorials.includes(t.id)).length}/{tutorials.length} complete
          </div>
        </div>

        {/* Tutorial list */}
        <div className="flex-1 overflow-y-auto scrollbar-thin" style={{ padding: 20 }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--text-dim)',
            lineHeight: 1.6,
            marginBottom: 16,
            maxWidth: 520,
          }}>
            {selectedTrack.description}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 520 }}>
            {tutorials.map(t => (
              <TutorialCard
                key={t.id}
                tutorial={t}
                onStart={() => startTutorial(t.id)}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-canvas)',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 20px',
        borderBottom: '1px solid var(--border-mid)',
        background: 'var(--bg-panel)',
      }}>
        <Button variant="ghost" size="sm" onClick={() => setView('sandbox')}>
          &larr; Sandbox
        </Button>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 14,
          color: 'var(--text-bright)',
          letterSpacing: '0.06em',
        }}>
          Tutorials
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'var(--text-dim)',
          marginLeft: 'auto',
        }}>
          {totalCompleted}/{totalTutorials} complete
        </div>
      </div>

      {/* Track grid */}
      <div className="flex-1 overflow-y-auto scrollbar-thin" style={{ padding: 20 }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--text-dim)',
          lineHeight: 1.6,
          marginBottom: 20,
          maxWidth: 560,
        }}>
          Build circuits from basic gates. Complete tutorials to unlock reusable components for harder challenges.
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 10,
          maxWidth: 700,
        }}>
          {TRACKS.map(track => (
            <TrackCard
              key={track.id}
              track={track}
              onSelect={() => setSelectedTrack(track)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
