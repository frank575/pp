import React, { useEffect, useState } from 'react'
import { useAsyncList } from '@/hooks/use-async-list'
import { useDebounce, useDebounceFunc, useQueryString } from '@jsl-react/hooks'
import { useAuthHttp } from '@/core/hooks/http/use-auth-http'

/**
 * @template T
 * @param {string} httpPath
 * @param {T} initQueryString
 * @return {{onChangeSearch: (function(string | string[]): function(string | string[]): void), total: *, search: T, onChangeTable: (function(*): void), onSearch: (function(): void), loading: boolean, queryString: T, dataSource: *}}
 */
export const useAsyncCommonList = (httpPath, initQueryString) => {
	const { _http } = useAuthHttp()
	const [queryString, setQueryString] = useQueryString(initQueryString)
	const [search, setSearch] = useState({ ...queryString })
	const [[dataSource, total], loading, getList] = useAsyncList(async () => {
		const { data } = await _http.post(httpPath, queryString)
		return [data.data?.content ?? [], data.data?.totalElements ?? 0]
	})
	const onChangeSearch = key => value =>
		setSearch(e => {
			if (Array.isArray(key)) {
				const _e = { ...e }
				key.forEach((k, i) => (_e[k] = value[i]))
				return _e
			} else {
				return { ...e, [key]: value ?? null }
			}
		})
	const onSearch = () => setQueryString({ ...search, number: 1 })
	const onChangeTable = pagination =>
		setQueryString(e => ({
			...e,
			size: pagination.pageSize,
			number: pagination.current,
		}))

	useEffect(getList, [queryString])

	return {
		dataSource,
		total,
		loading,
		queryString,
		search,
		onSearch,
		onChangeSearch,
		onChangeTable,
	}
}
