import { useEffect } from 'react'
import { useCircuitStore } from './store/circuitStore'
import { useTutorialStore } from './store/tutorialStore'
import { Toolbar } from './components/toolbar/Toolbar'
import { Sidebar } from './components/sidebar/Sidebar'
import { CircuitCanvas } from './components/canvas/CircuitCanvas'
import { TutorialHub } from './components/tutorials/TutorialHub'
import { TutorialPanel } from './components/tutorials/TutorialPanel'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'

function App() {
  const loadFromLocalStorage = useCircuitStore(s => s.loadFromLocalStorage)
  const view = useTutorialStore(s => s.view)

  useEffect(() => {
    loadFromLocalStorage()
  }, [loadFromLocalStorage])

  useKeyboardShortcuts()

  if (view === 'tutorial-hub') {
    return (
      <div className="flex flex-col h-screen w-screen bg-slate-950 overflow-hidden">
        <TutorialHub />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 overflow-hidden">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        {view === 'tutorial-active' ? <TutorialPanel /> : <Sidebar />}
        <div className="flex-1 overflow-hidden">
          <CircuitCanvas />
        </div>
      </div>
    </div>
  )
}

export default App
