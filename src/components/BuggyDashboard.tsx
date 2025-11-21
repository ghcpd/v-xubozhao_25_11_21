import React from 'react'
import '../buggy.css'

const BuggyDashboard: React.FC = () => {
  return (
    <div className="buggy-dashboard">
      <nav className="nav">
        {/* Missing aria-label intentionally */}
        <a href="#overview" className="active">Overview</a>
        <a href="#reports">Reports</a>
        <a href="#settings">Settings</a>
      </nav>

      <div className="content">
        <aside className="sidebar">
          <p><strong>Filters</strong></p>
          <label>
            <input type="checkbox" /> Last 7 days
          </label>
          <br />
          <label>
            <input type="checkbox" /> Last 30 days
          </label>
        </aside>

        <section className="main-panel" aria-labelledby="section-heading">
          <h2 id="section-heading">Usage Summary</h2>
          <div className="actions-top">
            {/* Low contrast primary button */}
            <button className="primary-button">Primary Action</button>
          </div>

          {/* Ungrouped actions scattered below */}
          <div className="actions-bottom">
            <button className="secondary-button">Save</button>
            <button className="secondary-button">Delete</button>
            <button className="secondary-button">Export</button>
          </div>

          <div className="cards">
            <div className="card">
              <h3>Active Users</h3>
              <p>1,234</p>
            </div>
            <div className="card">
              <h3>Page Views</h3>
              <p>56,789</p>
            </div>
            <div className="card">
              <h3>Errors</h3>
              <p>12</p>
            </div>
            <div className="card">
              <h3>Latency</h3>
              <p>220ms</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default BuggyDashboard
