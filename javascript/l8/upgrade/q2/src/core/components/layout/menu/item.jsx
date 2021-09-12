import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLayout } from '@/core/components/layout/service'
import { createClassName } from '@jsl'
import { Link } from 'react-router-dom'
import { useAuth } from '@/core/hooks/use-auth'
import { useRouteMatch } from 'react-router'

export const MenuItem = ({ el, border = false }) => {
	const routeMatch = useRouteMatch(el.to)
	const isMatch = useMemo(
		() =>
			routeMatch != null &&
			el._matchs.some(path => routeMatch.isExact && path === routeMatch.path),
		[el.to, el._matchs, routeMatch],
	)
	const auth = useAuth(e => e.auth)
	const layoutCollapse = useLayout(e => e.collapse)
	const sideKey = useLayout(e => e.sideKey)
	const hasChildren = useMemo(
		() => el.children && el.children.length,
		[el.children],
	)
	const ulRef = useRef(null)
	const [collapse, setCollapse] = useState(
		hasChildren ? el._defaultOpen : false,
	)
	const previousCollapseRef = useRef(collapse)

	const getChildrenHeight = () =>
		ulRef.current
			? Array.from(ulRef.current.children).reduce(
					(p, e) => p + e.clientHeight,
					0,
			  )
			: 0

	const onCollapse = () => {
		if (!hasChildren || !layoutCollapse) return
		if (collapse && ulRef.current)
			ulRef.current.style.height = `${getChildrenHeight()}px`
		setCollapse(e => !e)
	}

	const Content = useCallback(
		({ el }) => (
			<>
				<div className="mr-2">{el.icon}</div>
				<div
					className={createClassName({
						'transition-all': true,
						'opacity-0': !layoutCollapse,
						'opacity-1': layoutCollapse,
						'text-primary': collapse || isMatch,
					})}
				>
					{el.name}
				</div>
				{hasChildren ? (
					<i
						className={createClassName({
							'fas fa-caret-down transition-transform ml-2': true,
							'transform rotate-180': collapse,
						})}
					/>
				) : null}
			</>
		),
		[layoutCollapse, collapse, hasChildren, sideKey, isMatch],
	)

	const onChangeCollapse = () => {
		const ul = ulRef.current
		let timout = null
		if (ul != null) {
			if (collapse) {
				ul.style.height = `${getChildrenHeight()}px`
				timout = setTimeout(() => (ul.style.height = null), 150)
			} else {
				ul.style.height = `0px`
			}
		}
		return () => {
			if (timout != null) {
				clearTimeout(timout)
			}
		}
	}

	const onChangeLayoutCollapse = () => {
		if (!hasChildren) return
		setCollapse(previousCollapseRef.current)
		previousCollapseRef.current = collapse
	}

	useEffect(onChangeLayoutCollapse, [layoutCollapse])

	useEffect(onChangeCollapse, [collapse])

	return el.role != null && !el.role.some(e => e === auth?.role) ? null : (
		<li
			className={createClassName({
				'ml-4 py-2 whitespace-nowrap': true,
				'border-t-1 border-solid border-black': border,
			})}
		>
			{el.to ? (
				<Link
					className="flex items-center cursor-pointer"
					to={el.to}
					onClick={onCollapse}
				>
					<Content el={el} />
				</Link>
			) : (
				<div className="flex items-center cursor-pointer" onClick={onCollapse}>
					<Content el={el} />
				</div>
			)}
			{hasChildren ? (
				<ul
					className="overflow-hidden transition-all"
					style={{ height: 0 }}
					ref={ulRef}
				>
					{el.children.map(e => (
						<MenuItem key={e._key} el={e} />
					))}
				</ul>
			) : null}
		</li>
	)
}
