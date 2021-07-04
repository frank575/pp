import service from './service'
import { timeout } from '@jsl'
import {
	BILLBOARD,
	BILLBOARD_LIKE,
	EBillboardStatus,
	getNewId,
} from '@/core/api-service/_fake-table'

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

export const fetchBillboard = async req => {
	const { size, number, sort, order, status, keyword } = req
	await timeout().startSync(none, 500)
	const excludeContent = []
	BILLBOARD.forEach(e => {
		let pass = true
		if (status != null && !e.status.includes(status)) pass = false
		if (
			keyword != null &&
			typeof keyword === 'string' &&
			keyword.trim().length
		) {
			if (e.name.includes(keyword)) pass = true
			else pass = false
		}
		if (pass) excludeContent.push({ ...e, isLike: false, isDislike: false })
	})
	const content = (
		sort != null && order != null
			? excludeContent.sort((a, b) =>
					order === 'descend' ? b[sort] - a[sort] : a[sort] - b[sort],
			  )
			: excludeContent
	)
		.slice(number * size, number * size + size)
		.map(e => ({ ...e, isLike: false, isDislike: false }))

	BILLBOARD_LIKE.forEach(e => {
		content.some(f => {
			if (f.id === e.postId) {
				f.isLike = e.like
				f.isDislike = e.dislike
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
			total: excludeContent.length,
		},
	}
}

export const fetchAddBillboardPost = async ({ name }) => {
	await timeout().startSync(none, 500)
	BILLBOARD.push({
		id: getNewId(BILLBOARD),
		name,
		like: 0,
		status: [EBillboardStatus.new],
	})
	return {
		success: true,
		status: 200,
		message: '新增消息成功',
	}
}

export const fetchEditBillboardPost = async ({ id, name }) => {
	await timeout().startSync(none, 500)
	const index = BILLBOARD.findIndex(e => e.id === id)
	if (index !== -1) {
		BILLBOARD[index] = {
			...BILLBOARD[index],
			name,
		}
	}
	return {
		success: true,
		status: 200,
		message: '編輯消息成功',
	}
}

export const fetchDeleteBillboardPost = async id => {
	await timeout().startSync(none, 500)
	const postIndex = BILLBOARD.findIndex(e => e.id === id)
	const likeIndex = BILLBOARD_LIKE.findIndex(e => e.postId === id)
	if (postIndex !== -1) {
		BILLBOARD.splice(postIndex, 1)
	}
	if (likeIndex !== -1) {
		BILLBOARD_LIKE.splice(likeIndex, 1)
	}
	return {
		success: true,
		status: 200,
		message: '刪除消息成功',
	}
}

export const fetchLikeBillboardPost = async ({ id, like, dislike }) => {
	await timeout().startSync(none, 500)
	const likeIndex = BILLBOARD_LIKE.findIndex(e => e.postId === id)
	const postIndex = BILLBOARD.findIndex(e => e.id === id)
	if (likeIndex !== -1) {
		const likeEl = BILLBOARD_LIKE[likeIndex]
		const billboardEl = BILLBOARD[postIndex]
		if (like != null) {
			if (like) {
				if (likeEl.dislike) {
					likeEl.like = true
					likeEl.dislike = false
					billboardEl.like += 2
				} else {
					likeEl.like = true
					billboardEl.like++
				}
			} else {
				if (likeEl.like) {
					likeEl.like = false
					billboardEl.like--
				}
			}
		} else if (dislike != null) {
			if (dislike) {
				if (likeEl.like) {
					likeEl.like = false
					likeEl.dislike = true
					billboardEl.like -= 2
				} else {
					likeEl.dislike = true
					billboardEl.like--
				}
			} else {
				if (likeEl.dislike) {
					likeEl.dislike = false
					billboardEl.like++
				}
			}
		}
	} else {
		const billboardEl = BILLBOARD[postIndex]
		if (like != null) {
			BILLBOARD_LIKE.push({
				id: getNewId(BILLBOARD_LIKE),
				like: true,
				dislike: false,
				postId: id,
			})
			billboardEl.like++
		} else if (dislike != null) {
			BILLBOARD_LIKE.push({
				id: getNewId(BILLBOARD_LIKE),
				like: false,
				dislike: true,
				postId: id,
			})
			billboardEl.like--
		}
	}
	return {
		success: true,
		status: 200,
		message: `按消息${dislike ? '倒' : ''}讚成功`,
	}
}
