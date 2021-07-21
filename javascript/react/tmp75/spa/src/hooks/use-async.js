import { useCallback, useState } from 'react'

export const useAsync = promiseFunc => {
	const [state, setState] = useState([])
	const [loading, setLoading] = useState(false)
	const run = useCallback(async () => {
		setLoading(true)
		const data = await promiseFunc()
		setLoading(false)
		setState(data)
	}, [promiseFunc])

	return [state, loading, run]
}
