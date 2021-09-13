import { useLayout } from '@/core/components/layout/service'
import { MenuItem } from '@/core/components/layout/menu/item'
import { createClassName } from '@jsl'
import { useMemo } from 'react'
import { initMenus } from '@/core/components/layout/menu/utils'

export const Menu = ({ data }) => {
	const hasData = useMemo(() => data && data.length, [data])
	const collapse = useLayout(e => e.collapse)
	useMemo(() => initMenus(data), [data])

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
