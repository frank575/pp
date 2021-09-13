export const initMenus = data => {
	const deepSetKeys = (parents, node, key) => {
		if (node.children && node.children.length) {
			node.children.forEach((e, i) => {
				const k = `${key}-${i}`
				e._key = k
				e._matchs = []
				deepSetKeys(parents.concat(e), e, k)
			})
		} else {
			parents.forEach(e => e._matchs.push(node.to))
		}
	}
	data.forEach((e, i) => {
		const k = `${i}`
		e._key = k
		e._matchs = []
		deepSetKeys([e], e, k)
	})
}
