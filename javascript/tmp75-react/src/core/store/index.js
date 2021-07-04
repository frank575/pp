import { useProvider } from '@jsl-react/hooks'
import { useAuth } from '@/core/store/useAuth'
import { useLayout } from '@/core/store/useLayout'

const store = () => {
	const auth = useAuth()
	const layout = useLayout()
	return {
		...auth,
		...layout,
	}
}

export const { Provider: StoreProvider, inject: useStore } = useProvider(store)
