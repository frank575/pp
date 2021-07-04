import { useStore } from '@/core/store'

export const useTaskListService = () => {
	const useSideSelectedKeys = useStore(e => e.useSideSelectedKeys)
	useSideSelectedKeys('task')
	const previousPathname = useStore(e => e.previousPathname)
	console.log({ previousPathname })
	return {}
}
