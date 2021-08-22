import React from 'react'

export { Login }

function Login() {
  return <div className="login">
    <div className="login__tip">尚未登入</div>
    <div className="login__content">
      <input className="input login__content__input" placeholder="只有輸入 user 才可登入" />
      <div className="btn login__content__submit">登入</div>
    </div>
  </div>
}
