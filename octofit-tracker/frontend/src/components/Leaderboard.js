import React, { useEffect, useState } from 'react'

function buildBase() {
  const cs = process.env.REACT_APP_CODESPACE_NAME
  if (cs) return `https://${cs}-8000.app.github.dev`
  return 'http://localhost:8000'
}

export default function Leaderboard() {
  const [items, setItems] = useState([])

  const fetchData = async () => {
    const base = buildBase()
    const url = `${base}/api/leaderboard/`
    console.log('Fetching Leaderboard from', url)
    try {
      const r = await fetch(url)
      const data = await r.json()
      console.log('Leaderboard response', data)
      const list = Array.isArray(data) ? data : data.results || []
      setItems(list)
    } catch (err) {
      console.error('Leaderboard fetch error', err)
    }
  }

  useEffect(() => { fetchData() }, [])

  return (
    <div className="container py-4 app-container">
      <div className="app-header d-flex align-items-center">
        <h2 className="me-3">Leaderboard</h2>
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
                <th>Score</th>
                <th>Rank</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {items.map((e) => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{(e.user && (e.user.name || e.user)) || e.user_id || '-'}</td>
                  <td>{(e.team && (e.team.name || e.team)) || '-'}</td>
                  <td>{e.score}</td>
                  <td>{e.rank || '-'}</td>
                  <td>{e.timestamp || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
