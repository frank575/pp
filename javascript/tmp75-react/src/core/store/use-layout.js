import { useLocalStorageState, useSafeState } from '@jsl-hooks'
import { useCallback, useEffect } from 'react'

export const useLayout = () => {
	const [menuCollapsed, setMenuCollapsed] = useLocalStorageState(
		'tmp75_menu-collapsed',
		false,
	)
	const [sideSelectedKeys, setSideSelectedKeys] = useSafeState([])
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
