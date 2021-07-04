/// 似 Vue 的 class obj 方式寫 className
/// author frank575
/// v1 [broken] 改名為 createClassName
/// v0


/**
 * @param {Object.<string, boolean>} obj
 * @param {...string} classNames
 * @return {string} 轉換後的className
 */
export const createClassName = (obj, ...classNames) => {
	let className = classNames.join(' ')
	for (const k in obj) {
		if (obj[k] === true) {
			className += ' ' + k
		}
	}
	return className
}
