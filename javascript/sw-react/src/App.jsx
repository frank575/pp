import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const onLogin = () => {
    fetch('/login', {
      method: 'POST'
    }).then((v) => {
      console.log(v)
    })
  }
  const onRegister = () => {
    fetch('user')
      .then((v) => {
        return v.json()
      })
      .then((v) => {
        console.log(v)
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={onRegister}>
            註冊
          </button>
          <button type="button" onClick={onLogin}>
            登入
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
