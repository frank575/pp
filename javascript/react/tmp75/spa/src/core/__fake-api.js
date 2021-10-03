import { createEnum, timeout } from '75l'

export {
	EBillboardStatus,
	callNoAuthFakeApi,
	callNoAuthRandomSuccessFakeApi,
	fetchBillboard,
	fetchAddBillboardPost,
	fetchEditBillboardPost,
	fetchDeleteBillboardPost,
	fetchLikeBillboardPost,
}

const getNewId = list =>
	list.reduce(
		(p, e, i) => (e.id > p ? e.id : p) + (i === list.length - 1 ? 1 : 0),
		0,
	)

const TASK_LIST = [
	{
		id: 1,
		name: '陪妹妹買午餐',
		detail: '12點到了，要跟妹妹去買午餐，我去找一下妹妹',
	},
	{
		id: 2,
		name: '去找妹妹',
		detail: '找了好久找不到，不知道是不是被綁架了',
	},
	{
		id: 3,
		name: '打電話給媽媽',
		detail:
			'然後我打給媽媽問妹妹去哪了，結果媽媽痛斥我怎麼到現在還在說妹妹，「你根本沒有妹妹呀！」',
	},
	{
		id: 4,
		name: '寫日記',
		detail: '沒有妹妹的人生有什麼意義呢？對於這樣活在世界上的我，真的很抱歉',
	},
	{
		id: 5,
		name: '練肌肉',
		detail:
			'啊啊～別想啦！先去鍛鍊一下吧，我準備了一條繩子掛在上空，接著我開始鍛鍊起了我的脖子',
	},
	{
		id: 6,
		name: '開燈',
		detail: '好黑呀！奇怪，我不是正在鍛鍊的嗎？怎麼突然世界就黑了起來...',
	},
]

const cool = [
	'玉樹臨風',
	'英俊瀟灑',
	'風流倜儻',
	'一表人才',
	'高大威猛',
	'氣宇不凡',
	'溫文爾雅',
	'品貌非凡',
	'劍眉星眸',
	'清新俊逸',
	'挺鼻薄唇',
	'風流倜儻',
	'瀟灑英俊古雕刻畫',
	'淡定優雅',
	'飄逸寧人',
	'探扇淺笑',
	'俊美無濤氣宇軒昂',
	'風度翩翩',
	'儀表堂堂',
	'貌若潘安',
	'威風凜凜落落大方',
	'眉清目秀,',
	'相貌堂堂',
	'明眸皓齒',
	'英俊瀟灑一表人才',
	'威風凜凜',
	'眉清目秀',
	'相貌堂堂',
	'風度翩翩',
	'衣冠楚楚',
	'城北徐公',
	'明眸皓齒',
	'擲果潘安',
	'濃眉大眼',
	'玉質金相',
	'神采奕奕',
	'英俊瀟灑',
	'文質彬彬',
	'衣冠楚楚',
	'風華月貌',
	'玉樹臨風',
	'面如冠玉',
	'才貌雙全',
	'逸群之才',
	'溫文爾雅',
	'淑人君子',
	'品貌非凡',
	'才貌雙絕',
	'驚才風逸',
	'風流才',
	'子雅人深致',
	'宸寧之貌',
	'英姿勃發',
	'玉膚玉骨',
	'哥笑傾城',
]

const BILLBOARD_LIKE = [
	{ id: 1, like: true, dislike: false, postId: 1 },
	{ id: 2, like: false, dislike: true, postId: 2 },
]

const EBillboardStatus = createEnum({
	new: [1, '最新'],
	hot: [2, '熱門'],
	normal: [3, '一般'],
})

const BILLBOARD = Array.from(new Array(cool.length), (_, i) => {
	const like = ~~(Math.random() * 1000)
	const status = [EBillboardStatus.normal]
	if (i < 5) {
		status.push(EBillboardStatus.new)
	}
	if (like > 500) {
		status.push(EBillboardStatus.hot)
	}
	return {
		id: i + 1,
		name: `法蘭克是${cool[i]}的`,
		like,
		status,
	}
})

const none = () => {}

// 假搓搓了API
const callNoAuthFakeApi = async () => {
	await timeout().startSync(none, 500)
	return {
		success: true,
		status: 200,
		message: '成功',
	}
}

/*
	none 開始到以下都是假的，不過 callNoAuthFakeApi 可以在開發時假裝搓 api (_fake-table.js皆是用來服務以下代碼)
*/

// 用在身分驗證上
const callNoAuthRandomSuccessFakeApi = async () => {
	await timeout().startSync(none, 1500)
	const random = Math.random()
	const level = 0.1
	console.log(
		`random: ${random}
random > level(${level}) 表示身分驗證成功, 目前結果為: 驗證${
			random > level ? '成功' : '失敗'
		}`,
	)
	if (random > level) {
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

const fetchBillboard = async req => {
	const { size, number, sort, order, status, keyword } = req
	await timeout().startSync(none, 500)
	const excludeContent = []
	BILLBOARD.forEach(e => {
		let pass = true
		if (status != null && !e.status.includes(status)) pass = false
		if (
			keyword != null &&
			(typeof keyword === 'string' ? keyword.trim().length : true)
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

	console.log('[GET] fetchBillboard finished')
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

const fetchAddBillboardPost = async ({ name }) => {
	await timeout().startSync(none, 500)
	BILLBOARD.push({
		id: getNewId(BILLBOARD),
		name,
		like: 0,
		status: [EBillboardStatus.new],
	})

	console.log('[POST] fetchAddBillboardPost finished')
	return {
		success: true,
		status: 200,
		message: '新增消息成功',
	}
}

const fetchEditBillboardPost = async ({ id, name }) => {
	await timeout().startSync(none, 500)
	const index = BILLBOARD.findIndex(e => e.id === id)
	if (index !== -1) {
		BILLBOARD[index] = {
			...BILLBOARD[index],
			name,
		}
	}

	console.log('[PUT] fetchEditBillboardPost finished')
	return {
		success: true,
		status: 200,
		message: '編輯消息成功',
	}
}

const fetchDeleteBillboardPost = async id => {
	await timeout().startSync(none, 500)
	const postIndex = BILLBOARD.findIndex(e => e.id === id)
	const likeIndex = BILLBOARD_LIKE.findIndex(e => e.postId === id)
	if (postIndex !== -1) {
		BILLBOARD.splice(postIndex, 1)
	}
	if (likeIndex !== -1) {
		BILLBOARD_LIKE.splice(likeIndex, 1)
	}

	console.log('[DELETE] fetchDeleteBillboardPost finished')
	return {
		success: true,
		status: 200,
		message: '刪除消息成功',
	}
}

const fetchLikeBillboardPost = async ({ id, like, dislike }) => {
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

	console.log('[PUT] fetchLikeBillboardPost finished')
	return {
		success: true,
		status: 200,
		message: `按消息${dislike ? '倒' : ''}讚成功`,
	}
}
