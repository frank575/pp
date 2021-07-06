import { useLocalStorageState, useSafeState } from '@jsl-hooks'

export const useLayout = () => {
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
