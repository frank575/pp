import { message } from 'antd'
import { useStore } from '@/core/store'
import { callNoAuthFakeApi } from '@/core/api-service'
import { useHistory } from 'react-router'
import { useState } from 'react'

export const useLoginService = () => {
	const [submitLoading, setSubmitLoading] = useState(false)
	const history = useHistory()
	const setAuth = useStore(e => e.setAuth)
	const setToken = useStore(e => e.setToken)
	const initialUsername = import.meta.env.VITE_USERNAME
	const initialPassword = import.meta.env.VITE_PASSWORD
	const usernameValidator = (_, value) => {
		if (!value) {
			return Promise.reject(new Error('帳號為必填'))
		} else if (value !== initialUsername) {
			return Promise.reject(new Error('帳號錯誤'))
		}
		return Promise.resolve()
	}
	const passwordValidator = (_, value) => {
		if (!value) {
			return Promise.reject(new Error('密碼為必填'))
		} else if (value !== initialPassword) {
			return Promise.reject(new Error('密碼錯誤'))
		}
		return Promise.resolve()
	}
	const onLogin = async data => {
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
	return {
		submitLoading,
		setSubmitLoading,
		initialUsername,
		initialPassword,
		usernameValidator,
		passwordValidator,
		onLogin,
	}
}
