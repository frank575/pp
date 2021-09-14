import {
	createProvider,
	useLocalStorageState,
	useSafeState,
} from '@jsl-react'

const service = () => {
	const [menuCollapsed, setMenuCollapsed] = useLocalStorageState(
		'tmp75_menu-collapsed',
		false,
	)
	const [sideSelectedKeys, setSideSelectedKeys] = useSafeState([])
	return {
		menuCollapsed,
		setMenuCollapsed,
		sideSelectedKeys,
		setSideSelectedKeys,
	}
}

export const { Provider: LayoutProvider, inject: useLayout } =
	createProvider(service)
