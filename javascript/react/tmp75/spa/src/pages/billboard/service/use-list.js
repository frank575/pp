import { useEffect } from 'react'
import { useDebounceFunc, useSafeState, useQueryString } from '@jsl-react/hooks'
import { fetchBillboard, fetchLikeBillboardPost } from '@/core/api-service'
import { message } from 'antd'

export const useList = () => {
	const [data, setData] = useSafeState({ content: [], total: 0 })
	const [search, setSearch] = useQueryString({
		size: 10,
		number: 1,
		status: undefined,
		sort: undefined,
		order: undefined,
		keyword: '',
	})
	const [loading, setLoading] = useSafeState(true)

	const onChangeSearch = (key, value) => {
		setSearch(e => ({ ...e, number: 1, [key]: value }))
	}

	const [debounceChangeSearch, breakDebounceChangeSearch] = useDebounceFunc(
		(key, value) => {
			setSearch(e => ({ ...e, number: 1, [key]: value }))
		},
		1000,
	)

	const onChangeKeyword = (key, value) => {
		if (!value) {
			breakDebounceChangeSearch()
			return setSearch(e => ({ ...e, number: 1, [key]: value }))
		}
		debounceChangeSearch(key, value)
	}

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

	const getList = async () => {
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
	}

	const onLike = async (id, key = 'like', value = true) => {
		setLoading(true)
		const { success, message: resMessage } = await fetchLikeBillboardPost({
			id,
			[key]: value,
		})
		if (success) {
			message.success(resMessage)
			getList()
		}
	}

	useEffect(getList, [search])

	return {
		loading,
		data,
		search,
		getList,
		onChangeSearch,
		onChangeKeyword,
		onChangeTable,
		onLike,
	}
}
