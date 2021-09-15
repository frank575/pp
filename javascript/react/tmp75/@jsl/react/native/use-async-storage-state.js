import { useSafeState } from '../common/use-safe-state'

export const useAsyncStorageState = (key, initialValue) => {
	const [state, setState] = useSafeState(initialValue)
	return [state, setState]
}
