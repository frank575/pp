import service from './service'
import { timeout } from '@jsl'

export const fetchLogin = params => service.post('login', params)

const none = () => {}
// 假搓搓了API
export const callNoAuthFakeApi = async () => {
	await timeout().startSync(none, 500)
	return {
		success: true,
		status: 200,
		message: '成功',
	}
}
// 用在身分驗證上
export const callNoAuthRandomSuccessFakeApi = async () => {
	await timeout().startSync(none, 1500)
	const random = Math.random()
	console.log({ random })
	console.log(
		`random: ${random}
random > 0.3 表示身分驗證成功, 目前結果為: 驗證${
			random > 0.4 ? '成功' : '失敗'
		}`,
	)
	if (random > 0) {
		return {
			success: true,
			status: 200,
			message: '成功',
		}
	} else {
		return {
			success: false,
			status: 500,
			message: '失敗',
		}
	}
}
// 假裝搓了需要token的API
export const callAuthFakeApi = async () => {
	await timeout().startSync(none, 500)
	const token = localStorage.getItem('tmp75_token')
	if (token) {
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
