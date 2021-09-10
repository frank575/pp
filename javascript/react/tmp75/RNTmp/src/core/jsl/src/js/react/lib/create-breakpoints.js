/// 斷點鉤子
/// v2 {author: frank575} 修正為只判斷寬度變化
/// v1 {author: frank575} 擴展 opts.delay, opts.bootstrap
/// v0 {author: frank575}

import { useCallback, useEffect, useMemo, useRef } from 'react'

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
	 * @param {function(boolean)} cb
	 * @param {{bootstrap?: boolean, delay?: number}} opts
	 */
	const useBreakpoints = (range, cb, opts = {}) => {
		const { bootstrap = true, delay = 500 } = opts
		const breakpoints = useMemo(
			() => (typeof range === 'number' ? range : _screens[range] || 0),
			[range],
		)
		let timer = useRef(null)

		const onResize = useCallback(() => {
			if (timer.current != null) clearTimeout(timer.current)
			timer.current = setTimeout(() => {
				timer.current = null
				cb && cb(window.innerWidth <= breakpoints)
			}, delay)
		}, [cb, breakpoints])

		useEffect(() => {
			if (bootstrap) {
				cb && cb(window.innerWidth <= breakpoints)
			}
		}, [])

		useEffect(() => {
			window.addEventListener('resize', onResize)
			return () => window.removeEventListener('resize', onResize)
		}, [cb, onResize])
	}

	return { useBreakpoints }
}
