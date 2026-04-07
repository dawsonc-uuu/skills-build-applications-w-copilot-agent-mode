import React, { useEffect, useState } from 'react'

function buildBase() {
  const cs = import.meta.env.VITE_CODESPACE_NAME
  if (cs) return `https://${cs}-8000.app.github.dev`
  return 'http://localhost:8000'
}

export default function Teams() {
  const [items, setItems] = useState([])

  const fetchData = async () => {
    const base = buildBase()
    const url = `${base}/api/teams/`
    console.log('Fetching Teams from', url)
    try {
      const r = await fetch(url)
      const data = await r.json()
      console.log('Teams response', data)
      const list = Array.isArray(data) ? data : data.results || []
      setItems(list)
    } catch (err) {
      console.error('Teams fetch error', err)
    }
  }

  useEffect(() => { fetchData() }, [])

  return (
    <div className="container py-4 app-container">
      <div className="app-header d-flex align-items-center">
        <h2 className="me-3">Teams</h2>
        <button className="btn btn-primary btn-sm refresh-btn" onClick={fetchData}>Refresh</button>
      </div>

      <div className="card table-card">
        <div className="card-body p-0">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Members</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {items.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.name}</td>
                  <td>{(t.members && t.members.length) || '-'}</td>
                  <td>{t.created_at || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
