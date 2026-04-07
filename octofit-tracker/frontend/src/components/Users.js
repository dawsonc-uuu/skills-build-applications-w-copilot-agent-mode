import React, { useEffect, useState } from 'react'

function buildBase() {
  const cs = process.env.REACT_APP_CODESPACE_NAME
  if (cs) return `https://${cs}-8000.app.github.dev`
  return 'http://localhost:8000'
}

export default function Users() {
  const [items, setItems] = useState([])

  const fetchData = async () => {
    const base = buildBase()
    const url = `${base}/api/users/`
    console.log('Fetching Users from', url)
    try {
      const r = await fetch(url)
      const data = await r.json()
      console.log('Users response', data)
      const list = Array.isArray(data) ? data : data.results || []
      setItems(list)
    } catch (err) {
      console.error('Users fetch error', err)
    }
  }

  useEffect(() => { fetchData() }, [])

  return (
    <div className="container py-4 app-container">
      <div className="app-header d-flex align-items-center">
        <h2 className="me-3">Users</h2>
        <button className="btn btn-primary btn-sm refresh-btn" onClick={fetchData}>Refresh</button>
      </div>

      <div className="card table-card">
        <div className="card-body p-0">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {items.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.created_at || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
