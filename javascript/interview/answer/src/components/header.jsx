import React from 'react'
import { Link } from 'react-router-dom'

export {Header}

function Header(){
  return <div className="header">
    <div className="header__logo">面試題</div>
    <div className="menu" />
    <div className="header__account">尚未登入</div>
    <div className="header__nav">
      <Link className="header__nav__link" to="/login">登入</Link>
      <Link className="header__nav__link" to="/">私有路由(登入可見)</Link>
    </div>
  </div>
}
