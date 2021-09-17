/// 斷點鉤子
/// v3 {author: frank575} 將 screens 抽出去，並使用 ts 寫 jsdoc 優化 ide 調用
/// v2 {author: frank575} 修正為只判斷寬度變化
/// v1 {author: frank575} 擴展 opts.delay, opts.bootstrap
/// v0 {author: frank575}

import { useCallback, useEffect, useMemo, useRef } from 'react'

/**
 * @type {<T extends Object, K extends keyof T>(screens: T) => {
 * useBreakpoints: (range: K | number, callback: (is: boolean) => void, opts?: { boostrap?: boolean, delay?: number }) => void
 * }}
 */
export const createBreakpoints = screens => {
	const _screens = screens

	const useBreakpoints = (range, callback, opts = {}) => {
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
				callback?.(window.innerWidth <= breakpoints)
			}, delay)
		}, [callback, breakpoints])

		useEffect(() => {
			if (bootstrap) {
				callback?.(window.innerWidth <= breakpoints)
			}
		}, [])

		useEffect(() => {
			window.addEventListener('resize', onResize)
			return () => window.removeEventListener('resize', onResize)
		}, [callback, onResize])
	}

	return { useBreakpoints }
}
