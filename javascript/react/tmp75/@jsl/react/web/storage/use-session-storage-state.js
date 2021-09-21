/// 自動存到 sessionStorage 的 useState
/// v2 {author: frank575} 改成export const
/// v1 {author: frank575} useState改成useSafeState
/// v0 {author: frank575}

import { Dispatch } from 'react'
import { getStorageItem, useUpdateStorage } from './util'
import { useSafeState } from '../../common/use-safe-state'

export const useSessionStorageState = (key, initialValue) => {
	const [state, setState] = useSafeState(
		getStorageItem(key, initialValue, sessionStorage),
	)
	useUpdateStorage(key, state, sessionStorage)
	return [state, setState]
}
