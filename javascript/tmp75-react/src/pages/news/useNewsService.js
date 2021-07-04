import { useStore } from '@/core/store'

export const useNewsService = () => {
	const useSideSelectedKeys = useStore(e => e.useSideSelectedKeys)
	useSideSelectedKeys('news')
	return {}
}
