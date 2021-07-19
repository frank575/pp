/// 防抖方法鉤子
/// v0 {author: frank575}

import { useCallback, useRef } from 'react'

/**
 * @template T
 * @param {T} func
 * @param [delay=500]
 * @returns {T}
 */
export const useDebounceFunc = (func, delay = 500) => {
	const timeout = useRef(null)

	return useCallback(
		(...args) => {
			if (timeout.current) clearTimeout(timeout.current)
			timeout.current = setTimeout(() => {
				func(...args)
				timeout.current = null
			}, delay)
		},
		[func, delay],
	)
}
