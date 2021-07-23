import { useEffect } from 'react'
import {
	useDebounceFunc,
	useSafeState,
	useQueryString,
	useProvider,
} from '@jsl-react/hooks'
import { fetchBillboard, fetchLikeBillboardPost } from '@/core/__fake-api'
import { message } from 'antd'

export const { Provider: ListProvider, inject: useList } = useProvider(service)

function service() {
	const [data, setData] = useSafeState({ content: [], total: 0 })
	const [queryString, setQueryString] = useQueryString({
		size: 10,
		number: 1,
		status: undefined,
		sort: undefined,
		order: undefined,
		keyword: '',
	})
	const [loading, setLoading] = useSafeState(true)

	const onChangeSearch = (key, value) => {
		setQueryString(e => ({ ...e, number: 1, [key]: value }))
	}

	const [debounceChangeSearch, breakDebounceChangeSearch] = useDebounceFunc(
		(key, value) => {
			setQueryString(e => ({ ...e, number: 1, [key]: value }))
		},
		1000,
	)

	const onChangeKeyword = (key, value) => {
		if (!value) {
			breakDebounceChangeSearch()
			return setQueryString(e => ({ ...e, number: 1, [key]: value }))
		}
		debounceChangeSearch(key, value)
	}

	const onChangeTable = (pagination, filters, sorter) => {
		if (
			pagination.current !== queryString.number ||
			pagination.pageSize !== queryString.size
		) {
			setQueryString(e => ({
				...e,
				number: pagination.current,
				size: pagination.pageSize,
			}))
			return
		}
		if (
			sorter.field !== queryString.sort ||
			sorter.order !== queryString.order
		) {
			setQueryString(e => ({
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
			...queryString,
			number: queryString.number - 1,
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

	useEffect(getList, [queryString])

	return {
		loading,
		data,
		queryString,
		getList,
		onChangeSearch,
		onChangeKeyword,
		onChangeTable,
		onLike,
	}
}
