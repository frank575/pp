import { Wrap } from '@/pages/account/wrap'
import { Input } from '@/components/form/input'
import { Button } from '@/components/button'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from '@/components/form/lib/validator'
import { Jigsaw } from '@/pages/account/login/captcha/jigsaw'
import { useHttp } from '@/core/hooks/http/use-http'
import { createMessage } from '@/lib/create-message'
import { useRef, useState } from 'react'
import { useAuth } from '@/core/hooks/use-auth'

export default () => {
	const history = useHistory()
	const { http } = useHttp()
	const setAuth = useAuth(e => e.setAuth)
	const setToken = useAuth(e => e.setToken)
	const [authVisible, setAuthVisible] = useState(false)
	const cacheForm = useRef({})
	const form = useForm({
		username: '',
		password: '',
	})

	const login = async () => {
		const res = await http.post('/login', cacheForm.current)
		if (res.data.success) {
			setAuth(true)
			setToken(res.data.token)
			createMessage('登入成功')
			history.push('/')
		}
		return res
	}

	const onSubmit = async () => {
		const { data } = await form.submit()
		cacheForm.current = data
		setAuthVisible(true)
	}

	return (
		<Wrap title={'登入'}>
			<Input
				className="mb-4"
				ref={form.refs.username.ref}
				labelWidth={80}
				label={'帳號'}
				defaultValue={import.meta.env.VITE_USERNAME}
			/>
			<Input
				className="mb-4"
				ref={form.refs.password.ref}
				htmlType={'password'}
				togglePassword
				labelWidth={80}
				label={'密碼'}
				defaultValue={import.meta.env.VITE_PASSWORD}
			/>
			<div className="text-center mt-4">
				<div className="text-center mb-4">
					<Link className="text-primary text-sm" to={'/register'}>
						註冊
					</Link>
				</div>
				<Button onClick={onSubmit}>登入</Button>
			</div>
			<Jigsaw visible={authVisible} onLogin={login} onChange={setAuthVisible} />
		</Wrap>
	)
}
