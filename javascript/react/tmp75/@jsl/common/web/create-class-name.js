/// 似 Vue 的 class obj 方式寫 className
/// v2 {author: frank575} JSDOC 類型修正
/// v1 {author: frank575} [broken] 改名為 createClassName
/// v0 {author: frank575}

export const createClassName = (obj, ...classNames) => {
	let className = classNames.join(' ')
	for (const k in obj) {
		if (obj[k] === true) {
			className += ' ' + k
		}
	}
	return className
}
