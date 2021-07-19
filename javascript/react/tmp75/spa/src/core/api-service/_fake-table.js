import { createEnum } from '@jsl'

export const getNewId = list =>
	list.reduce(
		(p, e, i) => (e.id > p ? e.id : p) + (i === list.length - 1 ? 1 : 0),
		0,
	)
export const TASK_LIST = [
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
export const BILLBOARD_LIKE = [
	{ id: 1, like: true, dislike: false, postId: 1 },
	{ id: 2, like: false, dislike: true, postId: 2 },
]
export const EBillboardStatus = createEnum({
	new: [1, '最新'],
	hot: [2, '熱門'],
	normal: [3, '一般'],
})
export const BILLBOARD = Array.from(new Array(cool.length), (_, i) => {
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
