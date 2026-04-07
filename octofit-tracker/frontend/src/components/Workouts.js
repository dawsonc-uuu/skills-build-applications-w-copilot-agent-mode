import React, { useEffect, useState } from 'react'

function buildBase() {
  const cs = process.env.REACT_APP_CODESPACE_NAME
  if (cs) return `https://${cs}-8000.app.github.dev`
  return 'http://localhost:8000'
}

export default function Workouts() {
  const [items, setItems] = useState([])

  const fetchData = async () => {
    const base = buildBase()
    const url = `${base}/api/workouts/`
    console.log('Fetching Workouts from', url)
    try {
      const r = await fetch(url)
      const data = await r.json()
      console.log('Workouts response', data)
      const list = Array.isArray(data) ? data : data.results || []
      setItems(list)
    } catch (err) {
      console.error('Workouts fetch error', err)
    }
  }

  useEffect(() => { fetchData() }, [])

  return (
    <div className="container py-4 app-container">
      <div className="app-header d-flex align-items-center">
        <h2 className="me-3">Workouts</h2>
        <button className="btn btn-primary btn-sm refresh-btn" onClick={fetchData}>Refresh</button>
      </div>

      <div className="card table-card">
        <div className="card-body p-0">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Title</th>
                <th>Duration</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map((w) => (
                <tr key={w.id}>
                  <td>{w.id}</td>
                  <td>{w.user || w.user_id || '-'}</td>
                  <td>{w.title}</td>
                  <td>{w.duration_minutes || '-'}</td>
                  <td>{w.date || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
