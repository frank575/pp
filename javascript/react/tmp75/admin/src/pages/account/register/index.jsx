import React, { useState } from 'react'
import { NoLayoutWrap } from '@/components/no-layout-wrap'
import { Button, Form, Input, message } from 'antd'
import { Link } from 'react-router-dom'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useHistory } from 'react-router'
import { useStore } from '@/core/store'
import { callNoAuthFakeApi } from '@/core/api-service'

export default () => {
	const [submitLoading, setSubmitLoading] = useState(false)
	const history = useHistory()
	const setAuth = useStore(e => e.setAuth)
	const setToken = useStore(e => e.setToken)
	const password2Validator = getFieldValue => (_, value) => {
		const password = getFieldValue('password')
		if (!value) {
			return Promise.reject(new Error('必填'))
		} else if (value?.length < 4 || value?.length > 20) {
			return Promise.reject(new Error('必須為4-20個字元'))
		} else if (value !== password) {
			return Promise.reject(new Error('與密碼不吻合'))
		}
		return Promise.resolve()
	}

	const onRegister = async data => {
		console.log(data)

		const { username, password } = data
		setSubmitLoading(true)
		const { success } = await callNoAuthFakeApi()
		setSubmitLoading(false)
		if (success) {
			setAuth({ id: 1, account: initialUsername, name: 'frank' })
			setToken('just token')
			message.success('登入成功')
			history.replace('/billboard')
		}
	}

	return (
		<NoLayoutWrap title={'註冊'}>
			<Form
				name={'register-form'}
				onFinish={onRegister}
				labelAlign={'left'}
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
			>
				<Form.Item
					label={'帳號'}
					name={'username'}
					rules={[
						{ required: true, message: '必填' },
						{ type: 'email', message: '必須為email' },
					]}
					validateTrigger={['onChange', 'onBlur']}
				>
					<Input placeholder={'請輸入email'} />
				</Form.Item>
				<Form.Item
					label={'密碼'}
					name={'password'}
					rules={[
						{ required: true, message: '必填' },
						{ min: 4, max: 10, message: '必須為4-20個字元' },
					]}
					validateTrigger={['onChange', 'onBlur']}
				>
					<Input.Password
						placeholder={'4-20位字元'}
						iconRender={visible =>
							visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
						}
					/>
				</Form.Item>
				<Form.Item
					label={'確認密碼'}
					name={'password2'}
					required
					rules={[
						({ getFieldValue }) => ({
							validator: password2Validator(getFieldValue),
						}),
					]}
					validateTrigger={['onChange', 'onBlur']}
				>
					<Input.Password
						placeholder={'請與密碼保持一致'}
						iconRender={visible =>
							visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
						}
					/>
				</Form.Item>
				<div className={'text-right'}>
					<Link to={'/login'}>
						<Button className={'mr-2'}>返回登入</Button>
					</Link>
					<Button type={'primary'} htmlType={'submit'} loading={submitLoading}>
						註冊
					</Button>
				</div>
			</Form>
		</NoLayoutWrap>
	)
}
