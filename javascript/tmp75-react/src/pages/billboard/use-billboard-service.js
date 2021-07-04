import { useList } from '@/pages/billboard/use-list'

export const useBillboardService = () => {
	const list = useList()
	return {
		...list,
	}
}
