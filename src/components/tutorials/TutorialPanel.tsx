import { useTutorialStore } from '../../store/tutorialStore'
import { useCircuitStore } from '../../store/circuitStore'
import { GatePaletteItem } from '../sidebar/GatePaletteItem'
import { LibraryCard } from '../sidebar/LibraryCard'
import { VerificationFeedback } from './VerificationFeedback'
import { Button } from '../ui/Button'
import type { GateType, SavedCircuit } from '../../types/circuit'

const GATE_LABELS: Partial<Record<GateType, { label: string; description: string }>> = {
  AND:    { label: 'AND',  description: 'Output 1 if all inputs are 1' },
  OR:     { label: 'OR',   description: 'Output 1 if any input is 1' },
  NOT:    { label: 'NOT',  description: 'Inverts the input signal' },
  NAND:   { label: 'NAND', description: 'NOT AND — inverted AND' },
  NOR:    { label: 'NOR',  description: 'NOT OR — inverted OR' },
  XOR:    { label: 'XOR',  description: 'Output 1 if inputs differ' },
  XNOR:   { label: 'XNOR', description: 'Output 1 if inputs match' },
  CONSTANT: { label: 'Constant', description: 'Always 0 or 1 (click to toggle)' },
}

export function TutorialPanel() {
  const tutorial = useTutorialStore(s => s.activeTutorial)
  const verificationResult = useTutorialStore(s => s.verificationResult)
  const hintIndex = useTutorialStore(s => s.hintIndex)
  const verify = useTutorialStore(s => s.verify)
  const exitTutorial = useTutorialStore(s => s.exitTutorial)
  const resetTutorial = useTutorialStore(s => s.resetTutorial)
  const revealNextHint = useTutorialStore(s => s.revealNextHint)
  const progress = useTutorialStore(s => s.progress)
  const savedCircuits = useCircuitStore(s => s.savedCircuits)

  if (!tutorial) return null

  const isCompleted = progress.completedTutorials.includes(tutorial.id)

  const availableComponentCircuits: SavedCircuit[] = tutorial.availableComponents
    .map(tutId => {
      const scId = progress.unlockedComponents[tutId]
      return savedCircuits.find(sc => sc.id === scId)
    })
    .filter((sc): sc is SavedCircuit => sc !== undefined)

  const hasHints = tutorial.hints.length > 0
  const canShowMoreHints = hintIndex < tutorial.hints.length - 1

  return (
    <div className="flex flex-col h-full" style={{
      background: 'var(--bg-panel)',
      borderRight: '1px solid var(--border-mid)',
      width: 272,
    }}>
      {/* Tutorial header */}
      <div style={{
        padding: '12px 14px',
        borderBottom: '1px solid var(--border-mid)',
      }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 13,
            color: isCompleted ? '#22c55e' : 'var(--text-bright)',
            letterSpacing: '0.04em',
          }}>
            {tutorial.name}
          </div>
          <Button variant="ghost" size="sm" onClick={exitTutorial}>
            Exit
          </Button>
        </div>
        {isCompleted && (
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 9,
            color: '#22c55e',
            letterSpacing: '0.08em',
            padding: '2px 6px',
            background: '#052e16',
            border: '1px solid #166534',
            borderRadius: 2,
            display: 'inline-block',
            marginBottom: 4,
          }}>
            COMPLETED
          </div>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin" style={{ padding: '10px 14px' }}>
        {/* Briefing */}
        <SectionLabel label="Briefing" />
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'var(--text-primary)',
          lineHeight: 1.65,
          marginBottom: 14,
          whiteSpace: 'pre-wrap',
        }}>
          {tutorial.briefing}
        </div>

        {/* Available gates */}
        {tutorial.availableGates.length > 0 && (
          <>
            <SectionLabel label="Available Gates" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 14 }}>
              {tutorial.availableGates.map(gt => {
                const info = GATE_LABELS[gt]
                if (!info) return null
                return (
                  <GatePaletteItem
                    key={gt}
                    gateType={gt}
                    label={info.label}
                    description={info.description}
                  />
                )
              })}
            </div>
          </>
        )}

        {/* Available components */}
        {availableComponentCircuits.length > 0 && (
          <>
            <SectionLabel label="Components" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 14 }}>
              {availableComponentCircuits.map(sc => (
                <LibraryCard key={sc.id} circuit={sc} />
              ))}
            </div>
          </>
        )}

        {/* Hints */}
        {hasHints && (
          <>
            <SectionLabel label="Hints" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
              {tutorial.hints.slice(0, hintIndex + 1).map((hint, i) => (
                <div key={i} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: 'var(--text-primary)',
                  lineHeight: 1.5,
                  padding: '6px 10px',
                  background: 'rgba(139,92,246,0.06)',
                  border: '1px solid rgba(139,92,246,0.15)',
                  borderRadius: 3,
                }}>
                  {hint}
                </div>
              ))}
              {canShowMoreHints && (
                <Button variant="ghost" size="sm" onClick={revealNextHint}>
                  {hintIndex < 0 ? 'Show hint' : 'Next hint'}
                </Button>
              )}
            </div>
          </>
        )}

        {/* Verification result */}
        {verificationResult && (
          <>
            <SectionLabel label="Verification" />
            <div style={{ marginBottom: 14 }}>
              <VerificationFeedback result={verificationResult} />
            </div>
          </>
        )}

        {/* Unlock info */}
        {verificationResult?.passed && tutorial.unlocksComponent && (
          <div style={{
            padding: '10px 12px',
            borderRadius: 4,
            background: 'rgba(139,92,246,0.06)',
            border: '1px solid rgba(139,92,246,0.2)',
            marginBottom: 14,
          }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 10,
              color: '#8b5cf6',
              letterSpacing: '0.08em',
              marginBottom: 4,
            }}>
              COMPONENT UNLOCKED
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 12,
              color: 'var(--text-bright)',
            }}>
              {tutorial.unlocksComponent.name}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--text-dim)',
              marginTop: 2,
            }}>
              {tutorial.unlocksComponent.description}
            </div>
          </div>
        )}
      </div>

      {/* Bottom actions */}
      <div style={{
        padding: '10px 14px',
        borderTop: '1px solid var(--border-mid)',
        display: 'flex',
        gap: 8,
      }}>
        <Button variant="ghost" size="sm" onClick={resetTutorial} style={{ flex: 1 }}>
          Reset
        </Button>
        <Button variant="primary" size="sm" onClick={verify} style={{ flex: 2 }}>
          Verify
        </Button>
      </div>
    </div>
  )
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2" style={{ marginBottom: 6, userSelect: 'none' }}>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: 9,
        color: 'var(--text-dim)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: 'var(--border-dim)', marginTop: 1 }} />
    </div>
  )
}
