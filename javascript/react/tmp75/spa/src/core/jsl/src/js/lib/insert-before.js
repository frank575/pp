/// 將元素(參數1)插入到元素(參數2)前
/// v0 {author: frank575}

/**
 * @param {HTMLElement} newNode
 * @param {HTMLElement} existingNode
 */
export const insertBefore = (newNode, existingNode) => {
	const parent = existingNode.parentNode

	if (parent.firstChild === existingNode) {
		parent.prepend(newNode)
	} else {
		parent.insertBefore(newNode, existingNode)
	}
}
