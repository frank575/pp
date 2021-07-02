import service from './service'
import { timeout } from '@jsl'

export const fetchLogin = params => service.post('login', params)

const _none = () => {}
export const callNoAuthFakeApi = async () => {
	await timeout().startSync(_none, 500)
	return {
		success: true,
		status: 200,
		message: '成功',
	}
}
export const callAuthFakeApi = async () => {
	await timeout().startSync(_none, 500)
	const stringStore = localStorage.getItem('tmp75_store')
	const store = stringStore ? JSON.parse(stringStore) : null
	if (store.token) {
		return {
			success: true,
			status: 200,
			message: '成功',
		}
	}
	return {
		success: false,
		status: 401,
		message: '尚未登入',
	}
}
