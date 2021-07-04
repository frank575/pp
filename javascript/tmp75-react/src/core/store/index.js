import { useProvider } from '@jsl-react/hooks'
import { useAuth } from '@/core/store/useAuth'
import { useLayout } from '@/core/store/useLayout'
import { useRoute } from '@/core/store/useRoute'

const store = () => {
	const auth = useAuth()
	const layout = useLayout()
	const route = useRoute()
	return {
		...auth,
		...layout,
		...route,
	}
}

export const { Provider: StoreProvider, inject: useStore } = useProvider(store)
