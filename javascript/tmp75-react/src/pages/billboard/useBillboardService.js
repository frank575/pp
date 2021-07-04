import { useStore } from '@/core/store'
import { useEffect, useState } from 'react'
import { fetchNews } from '@/core/api-service'
import { EBillBoardStatus } from '@/core/api-service/_fake-table'

export const useBillboardService = () => {
	const useSideSelectedKeys = useStore(e => e.useSideSelectedKeys)
	useSideSelectedKeys('billboard')
	const [data, setData] = useState([])
	const [search, setSearch] = useState({
		pageSize: 10,
		current: 1,
		total: 0,
		status: undefined,
	})
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		;(async () => {
			setLoading(true)
			const res = await fetchNews({
				size: search.pageSize,
				number: search.current - 1,
			})
			setLoading(false)
			if (res.success) {
				setSearch(e => ({
					...e,
					current: 1,
					total: res.data.total,
				}))
				setData(res.data.content)
				return
			}
			setSearch(e => ({
				...e,
				total: 0,
			}))
			setData([])
		})()
	}, [])
	return {
		loading,
		data,
		search,
	}
}
