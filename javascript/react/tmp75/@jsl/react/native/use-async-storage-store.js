import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSafeState } from '../common/use-safe-state'
import { useEffect } from 'react'

/**
 * @type {<T extends Object, K extends keyof T>(appName: string, initialStore: T) => [T, (key: K, value: T[K]) => void]}
 */
export const useAsyncStorageStore = (appName, initialStore) => {
	const [store, setStore] = useSafeState(null)

	const initStore = async () => {
		const store = {}
		const promiseGetItems = []
		for (const k in initialStore) {
			promiseGetItems.push(
				new Promise(resolve => {
					AsyncStorage.getItem(appName + '_' + k, (err, value) =>
						resolve({ key: k, value }),
					)
				}),
			)
		}
		const keyValues = await Promise.all(promiseGetItems)
		keyValues.forEach(({ key, value }) => {
			if (value == null) {
				return (store[key] = initialStore[key])
			}
			try {
				store[key] = JSON.parse(value)
			} catch (err) {
				store[key] = initialStore[key]
			}
		})
		setStore(store)
	}

	const updateStore = (key, value) => {
		setStore(e => ({ ...e, [key]: value }))

		const storageKey = appName + '_' + key
		if (value == null) {
			AsyncStorage.removeItem(storageKey)
		} else {
			storageKey.setItem(key, JSON.stringify(value))
		}
	}

	useEffect(initStore, [])
	useEffect(updateStore, [])

	return [store, updateStore]
}
