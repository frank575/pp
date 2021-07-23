/// 斷點鉤子
/// v0 {author: frank575}

import { useCallback, useEffect, useMemo } from 'react'

export const createBreakpoints = (screens = {}) => {
	const _screens = {
		'2xl': 1536,
		xl: 1280,
		lg: 1024,
		md: 768,
		sm: 640,
		xs: 425,
		...screens,
	}

	/**
	 * @param {string|number} range
	 * @param {function(boolean, Event)} cb
	 */
	const useBreakpoints = (range, cb) => {
		const breakpoints = useMemo(
			() => (typeof range === 'number' ? range : _screens[range]),
			[range],
		)

		const onResize = useCallback(
			ev => {
				cb && cb(window.innerWidth <= breakpoints, ev)
			},
			[cb, breakpoints],
		)

		useEffect(() => {
			window.addEventListener('resize', onResize)
			return () => window.removeEventListener('resize', onResize)
		}, [cb, onResize])
	}

	return { useBreakpoints }
}
