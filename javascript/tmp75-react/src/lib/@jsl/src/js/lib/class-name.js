/// 似 Vue 的 class obj 方式寫 className
/// author frank575
/// v0


/**
 * @type {{create(Object.<string, boolean>, ...string): string}}
 */
export const ClassName = {
	create (obj, ...classNames) {
		let className = classNames.join(' ')
		for (const k in obj) {
			if (obj[k] === true) {
				className += ' ' + k
			}
		}
		return className
	},
}
