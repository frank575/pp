import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { HashRouter } from 'react-router-dom'
import './style/main.scss'

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
