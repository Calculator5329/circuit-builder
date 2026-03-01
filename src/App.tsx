import { useEffect } from 'react'
import { useCircuitStore } from './store/circuitStore'
import { Toolbar } from './components/toolbar/Toolbar'
import { Sidebar } from './components/sidebar/Sidebar'
import { CircuitCanvas } from './components/canvas/CircuitCanvas'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'

function App() {
  const loadFromLocalStorage = useCircuitStore(s => s.loadFromLocalStorage)

  useEffect(() => {
    loadFromLocalStorage()
  }, [loadFromLocalStorage])

  useKeyboardShortcuts()

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 overflow-hidden">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-hidden">
          <CircuitCanvas />
        </div>
      </div>
    </div>
  )
}

export default App
