/// 防止內存洩漏的 useState
/// v0 {author: frank575}

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * @template T
 * @param {T} _state
 * @returns [T, function(T | function(T): *): void]
 */
export const useSafeState = _state => {
	const _isMounted = useRef(true)
	const [state, setState] = useState(_state)
	const updateState = useCallback(update => {
		if (_isMounted.current) {
			setState(update)
		}
	}, [])
	useEffect(() => {
		return () => {
			_isMounted.current = false
		}
	}, [])
	return [state, updateState]
}
