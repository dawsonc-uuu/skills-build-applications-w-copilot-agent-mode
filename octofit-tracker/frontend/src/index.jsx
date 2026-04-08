import React from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import './App.css'

// Expose the Codespace name in console for debugging (Vite env)
const codespace = import.meta.env.VITE_CODESPACE_NAME || null
console.log('VITE_CODESPACE_NAME:', codespace)

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
