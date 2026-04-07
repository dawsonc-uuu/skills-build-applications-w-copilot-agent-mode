import React from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import './App.css'

// Expose the Codespace name in console for debugging
const codespace = process.env.REACT_APP_CODESPACE_NAME || null
console.log('REACT_APP_CODESPACE_NAME:', codespace)

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
