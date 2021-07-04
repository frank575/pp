import { useStore } from '@/core/store'

export const useHeaderService = () => {
	const setMenuCollapsed = useStore(e => e.setMenuCollapsed)
	const onLogout = useStore(e => e.onLogout)
	const onToggleCollapsed = () => setMenuCollapsed(e => !e)
	return {
		onToggleCollapsed,
		onLogout,
	}
}
