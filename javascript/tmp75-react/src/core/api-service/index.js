import service from './service'
import { timeout } from '@jsl'
import { BILL_BOARD, BILL_BOARD_LIKE } from '@/core/api-service/_fake-table'

export const fetchLogin = params => service.post('login', params)

/*
 下面都是假的，都是幻象，一切皆空(_fake-table.js皆是用來服務以下代碼)
*/

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
random > 0.1 表示身分驗證成功, 目前結果為: 驗證${
			random > 0.1 ? '成功' : '失敗'
		}`,
	)
	if (random > 0.1) {
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
export const fetchNews = async req => {
	const { size, number } = req
	await timeout().startSync(none, 500)
	const content = BILL_BOARD.slice(number * size, number * size + size).map(
		e => ({ ...e, isLike: false, isDislike: false }),
	)
	BILL_BOARD_LIKE.forEach(e => {
		content.some(f => {
			if (f.id === e.postId) {
				if (e.like) {
					f.isLike = true
				} else {
					f.isDislike = true
				}
				return true
			}
		})
	})
	return {
		success: true,
		status: 200,
		message: '成功',
		data: {
			content,
			total: BILL_BOARD.length,
		},
	}
}
