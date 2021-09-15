/// 防抖方法鉤子
/// v1 {author: frank575} [broken] 新增 clearTimeout 方法，並將返回改成 array
/// v0 {author: frank575}

import { useCallback, useRef } from 'react'

/**
 * @param {function(...[*]): void} func
 * @param [delay=500]
 * @return {[function(...[*]): void, function(): void]}
 */
export const useDebounceFunc = (func, delay = 500) => {
	const timeout = useRef(null)

	const _clearTimeout = useCallback(() => {
		if (timeout.current != null) {
			clearTimeout(timeout.current)
		}
	}, [])

	const debounceFunc = useCallback(
		(...args) => {
			_clearTimeout()
			timeout.current = setTimeout(() => {
				func(...args)
				timeout.current = null
			}, delay)
		},
		[func, delay, _clearTimeout],
	)

	return [debounceFunc, _clearTimeout]
}
