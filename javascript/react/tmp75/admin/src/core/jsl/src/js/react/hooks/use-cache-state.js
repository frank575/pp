/// 自動緩存到內存的useState
/// v0 {author: frank575}

import { useCallback } from 'react'
import { useSafeState } from './use-safe-state'

const CACHE_STATE = {}

/**
 * @template T
 * @param {Symbol} symbol
 * @param {T} initialState
 * @returns [T, function(T | function(T): T): void]
 */
export const useCacheState = (symbol, initialState) => {
	const [state, setState] = useSafeState(CACHE_STATE[symbol] ?? initialState)
	const updateState = useCallback(cb => {
		setState(e => {
			let _state
			if (typeof cb === 'function') {
				_state = cb(e)
			} else {
				_state = cb
			}
			CACHE_STATE[symbol] = _state
			return _state
		})
	}, [])
	return [state, updateState]
}
