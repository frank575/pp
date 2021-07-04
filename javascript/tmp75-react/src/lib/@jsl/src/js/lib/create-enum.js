/// enum 實用的狀態轉換器
/// v1 {author: frank575} [broken] Enum 改名為 createEnum
/// v0 {author: frank575}

/**
 * @template T
 * @param {T} obj
 * @return {T & {t(val: any): string, key(val: any): string, keys: string[], map: function(callback?: function(v: [any, any], k: string)): any[]}}
 */
export const createEnum = obj => {
	const translation = {}
	const reverseEnum = {}
	const $enum = {}
	const t = val => translation[val]
	const key = val => reverseEnum[val]
	const map = callback =>
		callback && keys.map(k => callback([$enum[k], t($enum[k])], k))
	const keys = []

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

	return { ...$enum, t, key, keys, map }
}
