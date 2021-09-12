export const initialMenus = (data, routeParams, pathname) => {
	const splitPathname = pathname.split('/')
	const routeParamsKeys = Object.keys(routeParams)
	routeParamsKeys.forEach((k, i) => {
		splitPathname[splitPathname.length - routeParamsKeys.length + i] = `:${k}`
	})
	const matchPathname = splitPathname.join('/')
	const deepSetKeys = (parents, node, key, isDefaultOpen = false) => {
		if (node.children && node.children.length) {
			node.children.forEach((e, i) => {
				const k = `${key}-${i}`
				e._key = k
				e._matchs = []
				deepSetKeys(parents.concat(e), e, k, e.to === matchPathname)
			})
		} else {
			parents.forEach(e => {
				if (e._defaultOpen == null) e._defaultOpen = isDefaultOpen
				else if (isDefaultOpen) e._defaultOpen = true
				e._matchs.push(node.to)
			})
		}
	}
	data.forEach((e, i) => {
		const k = `${i}`
		e._key = k
		e._matchs = []
		deepSetKeys([e], e, k, e.to === matchPathname)
	})
}
