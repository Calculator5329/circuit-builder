import { useEffect } from 'react'
import { useCircuitStore } from '../store/circuitStore'

export function useKeyboardShortcuts() {
  const removeSelected = useCircuitStore(s => s.removeSelected)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return

      if (e.key === 'Delete' || e.key === 'Backspace') {
        removeSelected()
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [removeSelected])
}
