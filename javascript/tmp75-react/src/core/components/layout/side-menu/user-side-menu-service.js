import { useStore } from '@/core/store'

export const userSideMenuService = () => {
	const menuCollapsed = useStore(e => e.menuCollapsed)
	const selectedKeys = useStore(e => e.sideSelectedKeys)
	return {
		menuCollapsed,
		selectedKeys,
	}
}
