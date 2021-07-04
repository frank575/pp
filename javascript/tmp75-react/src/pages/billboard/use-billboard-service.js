import { message } from 'antd'
import { useStore } from '@/core/store'
import { useCallback, useEffect, useState } from 'react'
import {
	fetchBillboard,
	fetchDeleteBillboardPost,
	fetchLikeBillboardPost,
} from '@/core/api-service'
import useDebounce from '../../lib/@jsl/src/js/react/hooks/use-debounce'

const useList = () => {
	const useSideSelectedKeys = useStore(e => e.useSideSelectedKeys)
	useSideSelectedKeys('billboard')
	const [data, setData] = useState({ content: [], total: 0 })
	const [search, setSearch] = useState({
		size: 10,
		number: 1,
		status: undefined,
		sort: undefined,
		order: undefined,
		keyword: '',
	})
	const [loading, setLoading] = useState(true)

	const onChangeSearch = (key, value) => {
		setSearch(e => ({ ...e, number: 1, [key]: value }))
	}

	const onDebounceChangeSearch = useDebounce((key, value) => {
		setSearch(e => ({ ...e, number: 1, [key]: value }))
	}, 1000)

	const onChangeTable = (pagination, filters, sorter) => {
		if (
			pagination.current !== search.number ||
			pagination.pageSize !== search.size
		) {
			setSearch(e => ({
				...e,
				number: pagination.current,
				size: pagination.pageSize,
			}))
			return
		}
		if (sorter.field !== search.sort || sorter.order !== search.order) {
			setSearch(e => ({
				...e,
				number: 1,
				sort: sorter.field,
				order: sorter.order,
			}))
		}
	}

	const getList = useCallback(async () => {
		setLoading(true)
		const res = await fetchBillboard({
			...search,
			number: search.number - 1,
		})
		setLoading(false)
		if (res.success) {
			setData({ total: res.data.total, content: res.data.content })
			return
		}
		setData({ total: 0, content: [] })
		console.log('取得公佈欄列表完成')
	}, [search])

	const onLike = useCallback(
		async (id, key = 'like', value = true) => {
			const { success, message: resMessage } = await fetchLikeBillboardPost({
				id,
				[key]: value,
			})
			if (success) {
				message.success(resMessage)
				getList()
			}
		},
		[getList],
	)

	const onDelete = useCallback(
		async id => {
			const { success, message: resMessage } = await fetchDeleteBillboardPost(
				id,
			)
			if (success) {
				message.success(resMessage)
				getList()
			}
		},
		[getList],
	)

	useEffect(getList, [search])

	return {
		loading,
		data,
		search,
		onChangeSearch,
		onDebounceChangeSearch,
		onChangeTable,
		onLike,
		onDelete,
	}
}

export const useBillboardService = () => {
	const list = useList()
	return {
		...list,
	}
}
