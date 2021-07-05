/// 自動綁定querystring的useState
/// v3 {author: frank575} 使用replace防止某些情況下導致瀏覽器歷史上一步卡死
/// v2 {author: frank575} refactor: 移除冗餘代碼
/// v1 {author: frank575} fix: 修正路由未正確帶參及parse壞掉的問題還有二次初始化的錯誤
/// v0 {author: frank575}

import { useCallback, useEffect, useRef } from 'react'
import { useHistory, useLocation } from 'react-router'
import { useSafeState } from './use-safe-state'

const getValue = (search, param) => new URLSearchParams(search).get(param)
const isNone = e => e == null || (typeof e === 'string' && e.trim() === '')
const transformQueryMapToString = (queryMap = {}) => {
	let first = true
	return Object.entries(queryMap).reduce((p, [k, e]) => {
		if (isNone(e)) {
			return p
		} else {
			if (first) {
				first = false
				return p + `?${k}=${e}`
			}
			return p + `&${k}=${e}`
		}
	}, '')
}
const initState = (initialState, location) => {
	const _state = initialState
	if (typeof _state === 'object') {
		for (let k in initialState) {
			const searchEl = getValue(location.search, k)
			if (searchEl != null) {
				switch (searchEl) {
					case /^L_/.test(searchEl):
						const strArrSearchEl = searchEl.replace(/^L_/, '[') + ']'
						_state[k] = JSON.parse(strArrSearchEl)
						break
					default:
						if (/^([0-9]+|true|false)$/.test(searchEl)) {
							_state[k] = JSON.parse(searchEl)
						} else {
							_state[k] = searchEl
						}
						break
				}
			}
		}
	}
	return _state
}
const transformState = state => {
	let _state = null
	if (typeof state === 'object') {
		for (let k in state) {
			const e = state[k]
			if (_state == null) _state = {}
			if (Array.isArray(e) && e.length) {
				_state[k] = `L_${e.join(',')}`
			} else {
				_state[k] = e
			}
		}
	}
	return _state
}

/**
 * @template T
 * @param {T} initialState
 * @returns [T, function(T | function(T): T): void]
 */
export const useSearch = (initialState = {}) => {
	const location = useLocation()
	const history = useHistory()
	const [state, setState] = useSafeState(() =>
		initState(initialState, location),
	)
	const isLock = useRef(true) // 防止 watch location 導致二次初始化

	const checkThenUpdateHistory = useCallback(
		(state, historyFuncKey = 'push') => {
			const queryState = transformState(state)
			if (queryState != null) {
				history[historyFuncKey](
					encodeURI(transformQueryMapToString(queryState)),
				)
			}
		},
		[],
	)

	const updateState = useCallback(
		cb => {
			const _state = typeof cb === 'function' ? cb(state) : cb
			if (isLock.current) isLock.current = false
			checkThenUpdateHistory(_state)
		},
		[state],
	)

	useEffect(() => {
		if (!location.search) {
			checkThenUpdateHistory(initialState, 'replace')
		} else {
			if (!isLock.current) {
				setState(initState(initialState, location))
			}
		}
	}, [location])

	return [state, updateState]
}
