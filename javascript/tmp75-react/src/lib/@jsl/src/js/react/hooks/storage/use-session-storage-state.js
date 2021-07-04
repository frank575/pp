/// 自動存到 sessionStorage 的 useState
/// v0 {author: frank575}

import { useState, Dispatch } from 'react'
import { getStorageItem, useUpdateStorage } from './util'

/**
 * @template T
 * @param {string} key
 * @param {T} initialValue
 * @returns {[T, Dispatch<T>]}
 */
const useSessionStorageState = (key, initialValue) => {
	const [state, setState] = useState(
		getStorageItem(key, initialValue, sessionStorage),
	)
	useUpdateStorage(key, state, sessionStorage)
	return [state, setState]
}

export default useSessionStorageState
