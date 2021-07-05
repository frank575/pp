/// 自動綁定querystring的useState
/// v0 {author: frank575}

import { useEffect, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router'
import { useSafeState } from './use-safe-state'

const getValue = (search, param) => new URLSearchParams(search).get(param)
const isNone = e => e == null || (typeof e === 'string' && e.trim() === '')
const transformQueryMapToString = (queryMap = {}) => {
	let first = true
	return Object.entries(queryMap).reduce((p, [k, e], i) => {
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
						_state[k] = JSON.parse(searchEl)
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
	const queryState = useMemo(() => transformState(state), [state])

	useEffect(() => {
		if (queryState != null) {
			history.push(transformQueryMapToString(queryState))
		}
	}, [state])

	return [state, setState]
}
