/// 自動緩存到內存的useState
/// v1 {author: frank575} 修正初始化沒寫入緩存
/// v0 {author: frank575}

import { useCallback, useEffect } from 'react'
import { useSafeState } from './use-safe-state'

const CACHE_STATE = {}

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

	useEffect(() => {
		if (CACHE_STATE[symbol] == null) {
			CACHE_STATE[symbol] = initialState
		}
	}, [])

	return [state, updateState]
}
