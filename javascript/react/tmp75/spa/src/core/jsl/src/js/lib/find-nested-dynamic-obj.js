/// 迴圈查詢嵌套物件的值
/// v1 {author: frank575} 重寫邏輯(原本懶得寫用他人的)，修正 cannot read property 'split' of undefined 的錯誤
/// v0 {author: frank575}

/**
 * @template T
 * @param {T} obj 要查詢的物件
 * @param {string} key 迴圈查詢的key eg x.x.x
 * @return {*} 找出的值
 */
export const findNestedDynamicObj = (obj, key) => {
	if (typeof obj !== 'object') {
		console.warn(`[findNestedDynamicObj::warn] obj 請傳 {}`)
		return key
	}
	const _key = typeof key === 'string' ? key : String(key)
	const ks = _key.split('.')
	let el = obj[_key] || key

	if (typeof el !== 'object' && ks.length < 2) {
		return el
	}

	el = obj[ks[0]]
	for (let i = 1; i < ks.length; i++) {
		if (el == null) {
			break
		}

		const k = ks[i]
		el = el[k] || key

		if (typeof el !== 'object') {
			if (i !== ks.length - 1) {
				el = key
			}
			break
		}
	}

	return el || key
}
