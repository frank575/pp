import { useLocalStorageState } from '@jsl-hooks'
import { useCallback, useEffect, useState } from 'react'

export const useLayout = () => {
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
