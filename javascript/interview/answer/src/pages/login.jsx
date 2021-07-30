import React, { useRef, useState } from 'react'
import { useAuth } from '../use-auth'
import { useHistory } from 'react-router'

export { Login }

function Login() {
  const history = useHistory()
  const { auth, login } = useAuth()
  const isSubmit = useRef(false)
  const [account, setAccount] = useState('')
  const [loading, setLoading] = useState(false)

  const onChangeAccount = ev => setAccount(ev.target.value)

  const onSubmit = async () => {
    setLoading(true)
    const success = await login(account)
    isSubmit.current = true
    setLoading(false)

    if (success) {
      return history.push('/')
    }
  }

  return <div className="login">
    {!loading
      ? <>
        <div className="login__tip">{!auth ? (isSubmit.current ? '尚未登入(帳號錯誤)' : '尚未登入') : '已登入'}</div>
        {!auth ? <div className="login__content">
          <input
            className="input login__content__input"
            placeholder="只有輸入 user 才可登入"
            value={account}
            onChange={onChangeAccount}
            onKeyUp={ev => ev.key === 'Enter' && onSubmit()}
          />
          <div className="btn login__content__submit" onClick={onSubmit}>登入</div>
        </div> : null}
      </>
      : <div className="login__tip">登入中...</div>
    }
  </div>
}
