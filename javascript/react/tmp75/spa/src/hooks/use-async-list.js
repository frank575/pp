import { useCallback, useState } from 'react'

export const useAsyncList = promiseFunc => {
	const [list, setList] = useState([])
	const [loading, setLoading] = useState(false)
	const run = useCallback(async () => {
		setLoading(true)
		const _list = await promiseFunc()
		setLoading(false)
		setList(_list)
	}, [promiseFunc])

	return [list, loading, run]
}
