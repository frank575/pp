import { timeout } from '@jsl'
import { message } from 'antd'
import { useStore } from '@/core/store'
import { callNoAuthFakeApi } from '@/core/api-service'
import { useHistory } from 'react-router'

export const useLoginService = () => {
	const history = useHistory()
	const setStorage = useStore('setStorage')
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
		const { username, password } = data
		console.log({ username, password })
		const { success } = await callNoAuthFakeApi()
		if (success) {
			setStorage(e => ({ ...e, token: 'just token' }))
			message.success('登入成功')
			history.replace('/task')
		}
	}
	return {
		initialUsername,
		initialPassword,
		usernameValidator,
		passwordValidator,
		onLogin,
	}
}
