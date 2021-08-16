import React, { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { NoLayoutWrap } from '@/components/no-layout-wrap'
import { useHistory } from 'react-router-dom'
import { callNoAuthFakeApi } from '@/core/__fake-api'
import { useAuth } from '@/core/hooks/use-auth'
import { usePathnameHistories } from '@/core/hooks/use-pathname-histories'

export default () => {
	const [submitLoading, setSubmitLoading] = useState(false)
	const history = useHistory()
	const fromPathname = usePathnameHistories(e => e.previousPathname)
	const setAuth = useAuth(e => e.setAuth)
	const setToken = useAuth(e => e.setToken)
	const initialUsername = import.meta.env.VITE_USERNAME
	const initialPassword = import.meta.env.VITE_PASSWORD
	const usernameValidator = (_, value) => {
		if (!value) {
			return Promise.reject(new Error('必填'))
		}
		return Promise.resolve()
	}
	const passwordValidator = (_, value) => {
		if (!value) {
			return Promise.reject(new Error('必填'))
		}
		return Promise.resolve()
	}
	const onLogin = async data => {
		$devLog(data)

		const { username, password } = data
		setSubmitLoading(true)
		const { success } = await callNoAuthFakeApi()
		setSubmitLoading(false)
		if (success) {
			setAuth({ id: 1, account: initialUsername, name: 'frank' })
			setToken('just token')
			message.success('登入成功')
			if (
				fromPathname != null &&
				fromPathname !== '/register' &&
				fromPathname !== '/login'
			) {
				history.replace(fromPathname)
			} else {
				history.replace('/billboard')
			}
		}
	}

	return (
		<NoLayoutWrap title={'登入'}>
			<Form name={'login-form'} onFinish={onLogin}>
				<Form.Item
					label={'帳號'}
					name={'username'}
					initialValue={initialUsername}
					rules={[
						{
							validator: usernameValidator,
						},
					]}
					validateTrigger={['onChange', 'onBlur']}
				>
					<Input placeholder={'frank@handsome.com'} />
				</Form.Item>
				<Form.Item
					label={'密碼'}
					name={'password'}
					initialValue={initialPassword}
					rules={[
						{
							validator: passwordValidator,
						},
					]}
					validateTrigger={['onChange', 'onBlur']}
				>
					<Input.Password
						placeholder={'0000'}
						iconRender={visible =>
							visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
						}
					/>
				</Form.Item>
				<div className="text-right">
					<Link to={'/register'}>
						<Button className="mr-2">註冊</Button>
					</Link>
					<Button type="primary" htmlType="submit" loading={submitLoading}>
						登入
					</Button>
				</div>
			</Form>
		</NoLayoutWrap>
	)
}
