/// 防抖鉤子
/// v0 {author: frank575}

import { useRef, useCallback } from 'react'
import { timeout } from '../../lib/timer/timeout'

/**
 * @param {function(...*)} fun
 * @param {number} [delay=500] delay
 * @returns {function(...*): void}
 */
const useDebounce = (fun, delay = 500) => {
	const timer = useRef(timeout())

	return useCallback(
		(...args) => {
			const { current } = timer
			current.start(() => fun(...args), delay)
		},
		[fun, delay],
	)
}

export default useDebounce
