import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../use-auth'

export {Header}

function Header(){
  const { auth, logout } = useAuth()
  const [showNav, setShowNav] = useState(false)
  const onChangeShowNav = show => () => setShowNav(show)

  return <div className="header">
    <div className="header__logo">面試題(解答)</div>
    <div className="menu header__menu" onClick={onChangeShowNav(true)} />
    {
      auth
        ? <div className="header__account" onClick={logout} style={{cursor: 'pointer'}}>登出</div>
        : <div className="header__account">尚未登入</div>
    }
    <div className="header__nav" style={{right: showNav ? 0 : '-180px'}}>
      <div className="header__nav__fixed">
        {auth ? <div className="logout" onClick={logout} style={{cursor: 'pointer'}}>登出</div> : null}
        <div className="close" onClick={onChangeShowNav(false)} />
      </div>
      <Link className="header__nav__link" to="/login">登入</Link>
      <Link className="header__nav__link" to="/">私有路由(登入可見)</Link>
    </div>
  </div>
}
