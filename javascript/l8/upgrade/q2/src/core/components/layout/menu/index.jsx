import { useLayout } from '@/core/components/layout/service'
import { MenuItem } from '@/core/components/layout/menu/item'
import { createClassName } from '@jsl'
import { useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'

const initialMenus = (data, routeParams, pathname) => {
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

export const Menu = ({ data }) => {
	const params = useParams()
	const location = useLocation()
	const initMenuState = {
		params,
		location,
	}
	const hasData = useMemo(() => data && data.length, [data])
	const collapse = useLayout(e => e.collapse)

	useMemo(
		() =>
			initialMenus(data, initMenuState.params, initMenuState.location.pathname),
		[data],
	)

	return useMemo(
		() => (
			<div
				className={createClassName({
					'flex flex-col bg-white shadow-md py-4 pl-0.5 pr-4 overflow-x-hidden transition-all': true,
					'w-48': collapse,
					'w-12': !collapse,
				})}
			>
				{hasData ? (
					<ul>
						{data.map((e, i) => (
							<MenuItem key={e._key} el={e} border={i > 0} />
						))}
					</ul>
				) : null}
			</div>
		),
		[data, collapse],
	)
}
