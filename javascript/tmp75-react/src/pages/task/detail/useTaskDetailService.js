import { useStore } from '@/core/store'

export const useTaskDetailService = () => {
	const useSideSelectedKeys = useStore(e => e.useSideSelectedKeys)
	useSideSelectedKeys('task')
	return {}
}
