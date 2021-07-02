/// 緩存版 useState
/// author frank575
/// v0


import { useEffect, useState, Dispatch } from 'react'

/**
 * @template T
 * @type {function(symbol: Symbol, initialValue: T): [T, Dispatch<T>]}
 */
export const useStorageState = (() => {
	const CACHE = {}
	return (symbol, initialValue) => {
		const [state, setState] = useState(CACHE[symbol] ?? initialValue)
		useEffect(() => {
			CACHE[symbol] = state
		}, [state])
		return [state, setState]
	}
})()
