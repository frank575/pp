import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * 瀑布流獲取數據
 * @param getList
 * @param options
 * @param {boolean} options.createdRun
 * @param {number} options.size
 * @param {number} options.range
 * @param {HTMLElement | Window} [options.el = window]
 * @return {{start: function(): void, end: function(): void, run: function(): Promise<void>, list: *[], setList: function(*[]): void | *[], loading: boolean}}
 */
export const useWaterfall = (
	getList,
	options = {}
) => {
	const { createdRun = true, size = 10, range = 0.95, el = window } = options
	const [isEnd, setIsEnd] = useState(false)
	const [list, setList] = useState([])
	const [loading, setLoading] = useState(false)
	const pagination = useRef({
		total: 0,
		size,
		number: 1,
	})
	const start = () => setIsEnd(false)
	const end = () => setIsEnd(true)

	const run = useCallback(
		async (isReset = false) => {
			setLoading(true)
			setIsEnd(true)
			if (isReset) pagination.current.number = 1
			const { data } = await getList({
				size,
				number: pagination.current.number,
			})
			pagination.current.total = data.data.totalElements ?? 0
			if (data.success) {
				if (isReset) {
					setList(data.data.content)
				} else {
					setList(e => [...e, ...data.data.content])
				}
				if (
					!(
						pagination.current.number * pagination.current.size >=
						pagination.current.total
					)
				) {
					pagination.current.number = pagination.current.number + 1
					setIsEnd(false)
				}
			} else {
				pagination.current.number = 1
			}
			setLoading(false)
		},
		[getList],
	)

	const _onScroll = useCallback(async () => {
		const { pageYOffset, innerHeight, scrollTop, clientHeight } = el
		const { scrollHeight } = el instanceof Window ? document.body : bindScrollElement
		const st = pageYOffset + innerHeight
		const r = st / scrollHeight
		if (!loading && r > range) {
			run()
		}
	}, [getList, loading, range])

	useEffect(() => {
		if (createdRun) run()
	}, [])

	useEffect(() => {
		if (getList != null && !isEnd && el != null) {
			el.addEventListener('scroll', _onScroll)
			return () => el.removeEventListener('scroll', _onScroll)
		}
	}, [getList, _onScroll, isEnd, el])

	return { list, setList, loading, start, end, run }
}
