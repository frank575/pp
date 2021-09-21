/// enum 實用的狀態轉換器
/// v3 {author: frank575} map, reduce 返回 index
/// v2 {author: frank575} [broken] map 返回改成 v, k，並新增 reduce 方法
/// v1 {author: frank575} [broken] Enum 改名為 createEnum
/// v0 {author: frank575}

export const createEnum = obj => {
	const translation = {}
	const reverseEnum = {}
	const $enum = {}
	const keys = []
	const t = val => translation[val]
	const key = val => reverseEnum[val]
	const map = callback =>
		callback ? keys.map((k, i) => callback($enum[k], k, i)) : keys
	const reduce = (callback, initialValue) => {
		let previous = initialValue
		keys.map((k, i) => {
			previous = callback(previous, $enum[k], k, i)
		})
		return previous
	}

	function addEnum(key, val) {
		if (Array.isArray(val)) {
			const [v, t] = val
			translation[v] = t
			$enum[key] = v
			reverseEnum[v] = key
		} else {
			$enum[key] = val
			reverseEnum[val] = key
		}
		keys.push(key)
	}

	for (const k in obj) {
		addEnum(k, obj[k])
	}

	return { ...$enum, t, key, keys, map, reduce }
}
