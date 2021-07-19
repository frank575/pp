/// 自動存到 localStorage 的 useState
/// v2 {author: frank575} 改成export const
/// v1 {author: frank575} useState改成useSafeState
/// v0 {author: frank575}

import { Dispatch } from 'react'
import { getStorageItem, useUpdateStorage } from './util'
import { useSafeState } from '../use-safe-state'

/**
 * @template T
 * @param {string} key
 * @param {T} initialValue
 * @returns {[T, Dispatch<T>]}
 */
export const useLocalStorageState = (key, initialValue) => {
	const [state, setState] = useSafeState(
		getStorageItem(key, initialValue, localStorage),
	)
	useUpdateStorage(key, state, localStorage)
	return [state, setState]
}
