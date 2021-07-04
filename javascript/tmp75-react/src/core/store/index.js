import { useHistory } from 'react-router'
import { useLocalStorageState, useProvider } from '@jsl-react/hooks'
import { useCallback, useEffect, useState } from 'react'

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

const useLayout = () => {
	const [menuCollapsed, setMenuCollapsed] = useLocalStorageState(
		'tmp75_menu-collapsed',
		false,
	)
	const [sideSelectedKeys, setSideSelectedKeys] = useState([])
	const useSideSelectedKeys = useCallback((keys = []) => {
		useEffect(() => {
			setSideSelectedKeys(keys)
		}, [])
	}, [])
	return {
		menuCollapsed,
		setMenuCollapsed,
		sideSelectedKeys,
		useSideSelectedKeys,
	}
}

const store = () => {
	const auth = useAuth()
	const layout = useLayout()
	return {
		...auth,
		...layout,
	}
}

export const { Provider: StoreProvider, inject: useStore } = useProvider(store)
