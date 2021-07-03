import { useHistory } from 'react-router'
import { useLocalStorageState, useProvider } from '@jsl-react/hooks'

const useAuth = () => {
	const history = useHistory()
	const [token, setToken] = useLocalStorageState('tmp75_token', null)
	const onLogout = () => {
		setToken(null)
		history.replace('/login')
	}
	return {
		token,
		setToken,
		onLogout,
	}
}

const store = () => {
	const auth = useAuth()
	const [menuCollapsed, setMenuCollapsed] = useLocalStorageState(
		'tmp75_menu-collapsed',
		false,
	)
	return {
		...auth,
		menuCollapsed,
		setMenuCollapsed,
	}
}

export const { Provider: StoreProvider, inject: useStore } = useProvider(store)
