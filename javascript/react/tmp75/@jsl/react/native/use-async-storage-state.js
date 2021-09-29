/// asyncStorageState
/// v0 {author: frank575}

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSafeState } from '../common/use-safe-state'
import { useCallback } from 'react'

export const useAsyncStorageState = (key, initialValue) => {
	const [state, setState] = useSafeState(initialValue)

	const bootstrap = useCallback(
		() =>
			new Promise(resolve => {
				AsyncStorage.getItem(key, (err, value) => {
					if (value == null) {
						resolve()
					}
					try {
						const storageValue = JSON.parse(value)
						setState(storageValue)
					} catch (err) {}
					resolve()
				})
			}),
		[AsyncStorage, key, setState],
	)

	const updateState = useCallback(
		value => {
			setState(value)
			if (value == null) {
				AsyncStorage.removeItem(key)
			} else {
				try {
					AsyncStorage.setItem(key, JSON.stringify(value))
				} catch (err) {
					AsyncStorage.removeItem(key)
				}
			}
		},
		[AsyncStorage, key, setState],
	)

	return [state, updateState, bootstrap]
}
