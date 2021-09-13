import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLayout } from '@/core/components/layout/service'
import { createClassName } from '@jsl'
import { Link } from 'react-router-dom'
import { useRouteMatch } from 'react-router'
import { useMitt } from '@/core/hooks/use-mitt'

export const MenuItem = ({ el, border = false }) => {
	const { on, emit } = useMitt()
	const routeMatch = useRouteMatch(el.to)
	const isMatch = useMemo(
		() =>
			routeMatch != null &&
			el._matchs.some(path => routeMatch.isExact && path === routeMatch.path),
		[el.to, el._matchs, routeMatch],
	)
	const layoutCollapse = useLayout(e => e.collapse)
	const hasChildren = useMemo(
		() => el.children && el.children.length,
		[el.children],
	)
	const ulRef = useRef(null)
	const [collapse, setCollapse] = useState(false)
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
			<div
				className={createClassName({
					'flex items-center cursor-pointer': true,
					'text-primary': collapse || isMatch,
				})}
			>
				<div className="mr-2">{el.icon}</div>
				<div
					className={createClassName({
						'transition-all': true,
						'opacity-0': !layoutCollapse,
						'opacity-1': layoutCollapse,
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
			</div>
		),
		[layoutCollapse, collapse, hasChildren, isMatch],
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
		if (!layoutCollapse) {
			previousCollapseRef.current = collapse
			setCollapse(false)
		} else {
			setCollapse(previousCollapseRef.current)
		}
	}

	const checkFirstInParentCollapse = useCallback(() => {
		if (!hasChildren && routeMatch != null && routeMatch.isExact) {
			setTimeout(() => {
				const _keys = el._key.split('-')
				const _keysLength = _keys.length
				for (let i = _keysLength - 1; i > 0; i--) {
					let emitKey = `menu-item`
					for (let j = 0; j < i; j++) {
						emitKey += `-${_keys[j]}`
					}
					emit(emitKey, true)
				}
			})
		}
	}, [routeMatch])

	on(`menu-item-${el._key}`, collapse => setCollapse(collapse))
	useEffect(onChangeLayoutCollapse, [layoutCollapse])
	useEffect(onChangeCollapse, [collapse])
	useEffect(checkFirstInParentCollapse, [])

	return el.validator != null && !el.validator(el) ? null : (
		<li
			className={createClassName({
				'ml-4 py-2 whitespace-nowrap': true,
				'border-t-1 border-solid border-black': border,
			})}
		>
			{el.to ? (
				<Link to={el.to} onClick={onCollapse}>
					<Content el={el} />
				</Link>
			) : (
				<div onClick={onCollapse}>
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
