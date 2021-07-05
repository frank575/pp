import { useProvider } from '@jsl-hooks'
import { useAuth } from '@/core/store/use-auth'
import { useLayout } from '@/core/store/use-layout'
import { useRoute } from '@/core/store/use-route'

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
