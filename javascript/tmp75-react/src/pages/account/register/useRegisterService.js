import { callNoAuthFakeApi } from '@/core/api-service'
import { message } from 'antd'
import { useHistory } from 'react-router'
import { useStore } from '@/core/store'
import { useState } from 'react'

export const useRegisterService = () => {
	const [submitLoading, setSubmitLoading] = useState(false)
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
		console.log(data)

		const { username, password } = data
		setSubmitLoading(true)
		const { success } = await callNoAuthFakeApi()
		setSubmitLoading(false)
		if (success) {
			setStorage(e => ({ ...e, token: 'just token' }))
			message.success('登入成功')
			history.replace('/task')
		}
	}

	return {
		submitLoading,
		setSubmitLoading,
		password2Validator,
		onRegister,
	}
}
