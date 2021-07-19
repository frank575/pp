/// 防抖鉤子
/// v2 {author: frank575} 移除timeout函數，使用原生寫
/// v1 {author: frank575} 改成export const
/// v0 {author: frank575}

import { useCallback, useRef } from 'react'

/**
 * @template T
 * @param {T} fun
 * @param {number} [ms=500] ms
 * @returns {T}
 */
export const useDebounce = (fun, ms = 500) => {
	const timeout = useRef(null)

	return useCallback(
		(...args) => {
			if (timeout.current) clearTimeout(timeout.current)
			timeout.current = setTimeout(() => {
				fun(...args)
				timeout.current = null
			}, ms)
		},
		[fun, ms],
	)
}
