import React, { useEffect, useState } from 'react'

function buildBase() {
  const cs = import.meta.env.VITE_CODESPACE_NAME
  if (cs) return `https://${cs}-8000.app.github.dev`
  return 'http://localhost:8000'
}

export default function Activities() {
  const [items, setItems] = useState([])

  const fetchData = async () => {
    const base = buildBase()
    const url = `${base}/api/activities/`
    console.log('Fetching Activities from', url)
    try {
      const r = await fetch(url)
      const data = await r.json()
      console.log('Activities response', data)
      const list = Array.isArray(data) ? data : data.results || []
      setItems(list)
    } catch (err) {
      console.error('Activities fetch error', err)
    }
  }

  useEffect(() => { fetchData() }, [])

  return (
    <div className="container py-4 app-container">
      <div className="app-header d-flex align-items-center">
        <h2 className="me-3">Activities</h2>
        <button className="btn btn-primary btn-sm refresh-btn" onClick={fetchData}>Refresh</button>
      </div>

      <div className="card table-card">
        <div className="card-body p-0">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Team</th>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Distance (km)</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {items.map((a) => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.user || a.user_id || '-'}</td>
                  <td>{a.team || '-'}</td>
                  <td>{a.type}</td>
                  <td>{a.duration_minutes || '-'}</td>
                  <td>{a.distance_km || '-'}</td>
                  <td>{a.timestamp || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
