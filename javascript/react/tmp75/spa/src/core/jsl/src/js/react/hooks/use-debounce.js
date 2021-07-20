/// 防抖Effect鉤子
/// v1 {author: frank575} 修正 deps 報錯異常
/// v0 {author: frank575}

import { useEffect } from 'react'

/**
 * @template T
 * @param {T} effect
 * @param {*[]} deps
 * @param [delay=500]
 * @returns {T}
 */
export const useDebounce = (effect, deps, delay = 500) => {
	useEffect(() => {
		const handler = setTimeout(() => effect(), delay)
		return () => clearTimeout(handler)
	}, [...deps ?? [], delay])
}
