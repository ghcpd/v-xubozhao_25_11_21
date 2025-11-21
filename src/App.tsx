import React, { useMemo, useState } from 'react'
import BuggyDashboard from './components/BuggyDashboard'
import FixedDashboard from './components/FixedDashboard'

const App: React.FC = () => {
  const [view, setView] = useState<'buggy' | 'fixed'>('buggy')

  const ViewComponent = useMemo(() => {
    return view === 'buggy' ? BuggyDashboard : FixedDashboard
  }, [view])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <h1 className="text-xl font-semibold text-gray-900">Demo Dashboard</h1>
          <div className="inline-flex rounded-lg border border-gray-200 bg-gray-100 p-1 text-sm">
            <button
              onClick={() => setView('buggy')}
              className={`${view === 'buggy' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-700'} rounded-md px-3 py-1 transition`}
            >
              Buggy
            </button>
            <button
              onClick={() => setView('fixed')}
              className={`${view === 'fixed' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-700'} rounded-md px-3 py-1 transition`}
            >
              Fixed
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">
        <ViewComponent />
      </main>
    </div>
  )
}

export default App
