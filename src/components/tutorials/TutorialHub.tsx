import { useState } from 'react'
import { useTutorialStore } from '../../store/tutorialStore'
import { TRACKS, getTutorialsForTrack } from '../../tutorials/tracks'
import { TrackCard } from './TrackCard'
import { TutorialCard } from './TutorialCard'
import { Button } from '../ui/Button'
import type { TutorialTrack } from '../../types/tutorial'

function WelcomeHero({ onStart, onSandbox }: { onStart: () => void; onSandbox: () => void }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '64px 24px 48px',
      maxWidth: 540,
      margin: '0 auto',
    }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 11,
        letterSpacing: '0.18em',
        color: '#8b5cf6',
        marginBottom: 16,
        textTransform: 'uppercase' as const,
      }}>
        Digital Logic Simulator
      </div>

      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 32,
        fontWeight: 400,
        color: 'var(--text-bright)',
        letterSpacing: '0.04em',
        lineHeight: 1.2,
        margin: '0 0 16px',
      }}>
        Circuit Builder
      </h1>

      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        color: 'var(--text-primary)',
        lineHeight: 1.7,
        margin: '0 0 36px',
        maxWidth: 440,
      }}>
        Build real digital circuits from logic gates. Complete challenges to unlock
        reusable components, then combine them into increasingly complex machines.
      </p>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button
          onClick={onStart}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 14,
            letterSpacing: '0.06em',
            color: '#fff',
            background: '#8b5cf6',
            border: 'none',
            borderRadius: 4,
            padding: '12px 32px',
            cursor: 'pointer',
            transition: 'background 0.15s, transform 0.1s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#7c3aed'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#8b5cf6'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Start First Challenge
        </button>
        <button
          onClick={onSandbox}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 12,
            letterSpacing: '0.05em',
            color: 'var(--text-dim)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px 12px',
            transition: 'color 0.12s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-dim)' }}
        >
          Skip to Sandbox
        </button>
      </div>
    </div>
  )
}

export function TutorialHub() {
  const setView = useTutorialStore(s => s.setView)
  const startTutorial = useTutorialStore(s => s.startTutorial)
  const progress = useTutorialStore(s => s.progress)
  const [selectedTrack, setSelectedTrack] = useState<TutorialTrack | null>(null)

  const totalCompleted = progress.completedTutorials.length
  const totalTutorials = TRACKS.reduce((sum, t) => sum + getTutorialsForTrack(t.id).length, 0)
  const isNewUser = totalCompleted < 3

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

      <div className="flex-1 overflow-y-auto scrollbar-thin" style={{ padding: '0 20px 20px' }}>
        {isNewUser ? (
          <WelcomeHero
            onStart={() => startTutorial('intro-wire')}
            onSandbox={() => setView('sandbox')}
          />
        ) : (
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--text-dim)',
            lineHeight: 1.6,
            padding: '20px 0',
            maxWidth: 560,
          }}>
            Build circuits from basic gates. Complete tutorials to unlock reusable components for harder challenges.
          </div>
        )}

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
