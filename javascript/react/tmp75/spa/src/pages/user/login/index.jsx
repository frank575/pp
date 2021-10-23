import { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { NoLayoutWrap } from '@/components/no-layout-wrap'
import { useHistory } from 'react-router-dom'
import { useAuth } from '@/core/hooks/use-auth'

const initialUsername = import.meta.env.VITE_USERNAME
const initialPassword = import.meta.env.VITE_PASSWORD

export default () => {
	const history = useHistory()
	const setAuth = useAuth(e => e.setAuth)
	const setToken = useAuth(e => e.setToken)
	const [submitLoading, setSubmitLoading] = useState(false)

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

	const onLogin = async _data => {
		setSubmitLoading(true)
		const { success } = await { success: true }
		setSubmitLoading(false)

		if (success) {
			setAuth({ id: 1, account: initialUsername, name: 'frank' })
			setToken('just token')
			message.success('登入成功')
			history.replace('/')
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
					<Input />
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
