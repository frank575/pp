import { useCallback, useEffect, useRef, useState } from 'react'

export const useWaterfall = (getList, size, range = 0.8) => {
	const [isEnd, setIsEnd] = useState(false)
	const [list, setList] = useState()
	const [loading, setLoading] = useState()
	const pagination = useRef({
		total: 0,
		size,
		number: 1,
	})
	const start = () => setIsEnd(false)
	const end = () => setIsEnd(true)

	const _onScroll = useCallback(
		async ev => {
			const { pageYOffset, innerHeight } = window
			const { scrollHeight } = document.body
			const st = pageYOffset + innerHeight
			const r = st / scrollHeight
			if (!loading && r > range) {
				setLoading(true)
				const { data } = await getList()
				pagination.current.total = data.totalElements
				pagination.current.number = pagination.current.number + 1
				if (data.success) {
					setList(e => [...e, ...data.data.content])
					if (
						pagination.current.number * pagination.current.size >=
						pagination.current.total
					) {
						setIsEnd(true)
					}
				} else {
					setIsEnd(true)
				}
				setLoading(false)
			}
		},
		[getList, loading, range],
	)

	useEffect(() => {
		if (getList != null && !isEnd) {
			window.addEventListener('scroll', _onScroll)
			return () => window.removeEventListener('scroll', _onScroll)
		}
	}, [getList, _onScroll, isEnd])

	return { list, loading, start, end }
}
