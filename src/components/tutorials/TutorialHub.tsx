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
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '56px 24px 40px',
    }}>
      {/* Radial glow */}
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        height: 500,
        background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 11,
        letterSpacing: '0.24em',
        color: '#8b5cf6',
        marginBottom: 20,
        textTransform: 'uppercase' as const,
        position: 'relative',
      }}>
        Digital Logic Simulator
      </div>

      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 48,
        fontWeight: 400,
        color: '#e2e8f0',
        letterSpacing: '0.06em',
        lineHeight: 1.1,
        margin: '0 0 20px',
        textShadow: '0 0 60px rgba(139,92,246,0.15)',
        position: 'relative',
      }}>
        Circuit Builder
      </h1>

      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        color: 'var(--text-primary)',
        lineHeight: 1.8,
        margin: '0 0 36px',
        maxWidth: 460,
        position: 'relative',
      }}>
        Build real digital circuits from logic gates. Complete challenges
        to unlock reusable components, then combine them into
        increasingly complex machines.
      </p>

      <div style={{ display: 'flex', gap: 14, alignItems: 'center', position: 'relative' }}>
        <button
          onClick={onStart}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 14,
            letterSpacing: '0.06em',
            color: '#fff',
            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            border: 'none',
            borderRadius: 8,
            padding: '14px 36px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 24px rgba(139,92,246,0.3)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(139,92,246,0.45)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 24px rgba(139,92,246,0.3)'
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
            border: '1px solid var(--border-mid)',
            borderRadius: 8,
            cursor: 'pointer',
            padding: '13px 22px',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = 'var(--text-primary)'
            e.currentTarget.style.borderColor = 'var(--border-hi)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'var(--text-dim)'
            e.currentTarget.style.borderColor = 'var(--border-mid)'
          }}
        >
          Skip to Sandbox
        </button>
      </div>
    </div>
  )
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      marginBottom: 24,
    }}>
      <div style={{ height: 1, flex: 1, background: 'var(--border-dim)' }} />
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 10,
        letterSpacing: '0.2em',
        color: 'var(--text-dim)',
        textTransform: 'uppercase' as const,
        whiteSpace: 'nowrap' as const,
      }}>
        {label}
      </div>
      <div style={{ height: 1, flex: 1, background: 'var(--border-dim)' }} />
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
      {/* Header bar */}
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

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {isNewUser ? (
          <WelcomeHero
            onStart={() => startTutorial('intro-wire')}
            onSandbox={() => setView('sandbox')}
          />
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '40px 24px 8px',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--text-dim)',
              lineHeight: 1.7,
              maxWidth: 480,
              margin: '0 auto',
            }}>
              Build circuits from basic gates. Complete tutorials to unlock
              reusable components for harder challenges.
            </div>
          </div>
        )}

        {/* Tracks section */}
        <div style={{
          maxWidth: 920,
          margin: '0 auto',
          padding: '0 28px 48px',
        }}>
          <SectionDivider label={`${TRACKS.length} tracks · ${totalTutorials} challenges`} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 10,
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
    </div>
  )
}
