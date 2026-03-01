import { useState } from 'react'
import { useCircuitStore } from '../../store/circuitStore'
import { LibraryCard } from './LibraryCard'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'

export function CircuitLibrary() {
  const { savedCircuits, saveCurrentAsComponent, nodes } = useCircuitStore()
  const [saveOpen, setSaveOpen] = useState(false)
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')

  const hasIO = nodes.some(n => n.data.gateType === 'INPUT') &&
                nodes.some(n => n.data.gateType === 'OUTPUT')

  const handleSave = () => {
    if (!name.trim()) return
    saveCurrentAsComponent(name.trim(), desc.trim() || undefined)
    setName('')
    setDesc('')
    setSaveOpen(false)
  }

  const inputStyle = {
    width: '100%',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-mid)',
    borderRadius: 2,
    padding: '6px 10px',
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    color: 'var(--text-bright)',
    outline: 'none',
    transition: 'border-color 0.12s',
  }

  return (
    <div className="flex flex-col gap-2 p-3">
      <Button
        variant="primary"
        size="sm"
        onClick={() => setSaveOpen(true)}
        disabled={nodes.length === 0}
        className="w-full justify-center"
      >
        + SAVE AS COMPONENT
      </Button>

      {!hasIO && nodes.length > 0 && (
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: '#7a5500',
          padding: '4px 4px',
          lineHeight: 1.5,
          borderLeft: '2px solid #ffb30044',
          paddingLeft: 8,
        }}>
          TIP: add INPUT + OUTPUT nodes to define this component's ports.
        </p>
      )}

      {savedCircuits.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '28px 0',
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            color: 'var(--border-dim)',
            marginBottom: 8,
          }}>[ ]</div>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--text-dim)',
            lineHeight: 1.6,
          }}>
            No saved components.<br />Build a circuit and save it!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-1.5 mt-1">
          {savedCircuits.map(sc => (
            <LibraryCard key={sc.id} circuit={sc} />
          ))}
        </div>
      )}

      <Modal open={saveOpen} onClose={() => setSaveOpen(false)} title="SAVE AS COMPONENT">
        <div className="flex flex-col gap-3">
          <div>
            <label style={{
              display: 'block',
              fontFamily: 'var(--font-display)',
              fontSize: 9,
              color: 'var(--text-dim)',
              letterSpacing: '0.12em',
              marginBottom: 6,
              textTransform: 'uppercase',
            }}>
              Name *
            </label>
            <input
              autoFocus
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSave() }}
              placeholder="e.g. Half Adder"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'var(--border-hi)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border-mid)')}
            />
          </div>
          <div>
            <label style={{
              display: 'block',
              fontFamily: 'var(--font-display)',
              fontSize: 9,
              color: 'var(--text-dim)',
              letterSpacing: '0.12em',
              marginBottom: 6,
              textTransform: 'uppercase',
            }}>
              Description (optional)
            </label>
            <input
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="What does this circuit do?"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'var(--border-hi)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border-mid)')}
            />
          </div>
          <div className="flex gap-2 justify-end mt-1">
            <Button variant="ghost" onClick={() => setSaveOpen(false)}>CANCEL</Button>
            <Button variant="primary" onClick={handleSave} disabled={!name.trim()}>SAVE</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
