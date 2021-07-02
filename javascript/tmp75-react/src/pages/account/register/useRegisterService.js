import { callNoAuthFakeApi } from '@/core/api-service'
import { message } from 'antd'
import { useHistory } from 'react-router'
import { useStore } from '@/core/store'

export const useRegisterService = () => {
	const history = useHistory()
	const setStorage = useStore('setStorage')
	const password2Validator = getFieldValue => (_, value) => {
		const password = getFieldValue('password')
		if (!value) {
			return Promise.reject(new Error('密碼為必填'))
		} else if (value?.length < 4 || value?.length > 20) {
			return Promise.reject(new Error('必須為4-20個字元'))
		} else if (value !== password) {
			return Promise.reject(new Error('與密碼不吻合'))
		}
		return Promise.resolve()
	}

	const onRegister = async data => {
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
		password2Validator,
		onRegister,
	}
}
