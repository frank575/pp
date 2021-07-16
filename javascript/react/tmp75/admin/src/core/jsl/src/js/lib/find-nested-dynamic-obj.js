/// 迴圈查詢嵌套物件的值
/// v0 {author: frank575}

/**
 * @template T
 * @param {T} obj 要查詢的物件
 * @param {string} key 迴圈查詢的key eg x.x.x
 * @return {*} 找出的值
 */
export const findNestedDynamicObj = (obj, key) => {
	let result = obj[key] || key
	if (obj[key] != null && typeof obj[key] !== 'object') return result

	const sptKeys = key.split('.')
	if (sptKeys.length < 2) return result

	let i = 0,
		el = obj[sptKeys[i]]

	while (el != null) {
		el = el[sptKeys[++i]]
		if (typeof el === 'object') {
			continue
		}
		result = el
		break
	}

	return result
}
