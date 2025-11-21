import React from 'react'

const FixedDashboard: React.FC = () => {
  return (
    <div className="fixed-dashboard flex flex-col gap-6">
      <a
        href="#main-panel"
        className="sr-only focus:not-sr-only focus:rounded focus:bg-white focus:p-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
      >
        Skip to main content
      </a>

      <nav
        aria-label="Primary navigation"
        className="rounded-lg border border-gray-200 bg-white shadow-sm"
      >
        <ul className="flex flex-wrap gap-2 px-4 py-3 text-sm font-medium text-gray-600">
          <li>
            <a
              href="#overview"
              aria-current="page"
              className="rounded-md px-3 py-2 text-gray-900 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              Overview
            </a>
          </li>
          <li>
            <a
              href="#reports"
              className="rounded-md px-3 py-2 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              Reports
            </a>
          </li>
          <li>
            <a
              href="#settings"
              className="rounded-md px-3 py-2 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              Settings
            </a>
          </li>
        </ul>
      </nav>

      <div className="flex flex-col gap-4 lg:flex-row">
        <aside className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm lg:w-64" aria-label="Filters">
          <form className="space-y-3 text-sm text-gray-700">
            <fieldset>
              <legend className="text-sm font-semibold text-gray-800">Date range</legend>
              <div className="mt-2 space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                  Last 7 days
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                  Last 30 days
                </label>
              </div>
            </fieldset>
          </form>
        </aside>

        <section
          id="main-panel"
          className="flex-1 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          aria-labelledby="section-heading"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 id="section-heading" className="text-lg font-semibold text-gray-900">
                Usage Summary
              </h2>
              <p className="text-sm text-gray-500">Monitor active users, views, and system health.</p>
            </div>

            {/* Grouped action buttons */}
            <div
              role="group"
              aria-label="Primary actions"
              className="inline-flex divide-x divide-brand-700 overflow-hidden rounded-md border border-brand-700"
            >
              <button
                type="button"
                className="bg-brand-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                Primary Action
              </button>
              <button
                type="button"
                className="bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                Export
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Active Users', value: '1,234' },
              { label: 'Page Views', value: '56,789' },
              { label: 'Errors', value: '12' },
              { label: 'Latency', value: '220ms' },
            ].map((card) => (
              <div
                key={card.label}
                data-testid="stats-card"
                className="rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-4 shadow-sm"
              >
                <h3 className="text-sm font-medium text-gray-600">{card.label}</h3>
                <p className="mt-2 text-2xl font-semibold text-gray-900">{card.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default FixedDashboard
