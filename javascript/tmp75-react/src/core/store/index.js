import { useLocalStorageState, useProvider } from '@jsl-react/hooks'

const store = () => {
	const [storage, setStorage] = useLocalStorageState('tmp75_store', {
		token: null, // string | null
	})
	return {
		storage,
		setStorage,
	}
}

export const { Provider: StoreProvider, inject: useStore } = useProvider(store)
