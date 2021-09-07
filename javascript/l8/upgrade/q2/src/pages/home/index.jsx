import { PageContent } from '@/components/page-content'
import { useEffect, useRef } from 'react'

const CANVAS_WIDTH = 504
const CANVAS_HEIGHT = 302
const PADDING = 5
const DOUBLE_PADDING = PADDING * 2
const MAX_WIDTH = CANVAS_WIDTH - DOUBLE_PADDING
const MAX_HEIGHT = CANVAS_HEIGHT - DOUBLE_PADDING

export default () => {
	const rectPos = useRef([PADDING, PADDING])
	const draggingRef = useRef({
		cornerIndex: -1,
		cornerPressDownPos: [0, 0],
		rect: false,
		rectPressDownPos: [0, 0],
	})

	useEffect(() => {
		const canvas = document.getElementById('canvas')
		const ctx = canvas.getContext('2d')

		const draw = () => {
			ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

			ctx.fillStyle = 'black'
			ctx.fillRect(PADDING, PADDING, CANVAS_WIDTH - PADDING * 2, MAX_HEIGHT)

			const [rx, ry] = rectPos.current
			ctx.fillStyle = 'rgba(255, 255, 255, .3)'
			ctx.strokeStyle = 'red'
			ctx.fillRect(rx, ry, MAX_HEIGHT, MAX_HEIGHT)
			ctx.strokeRect(rx, ry, MAX_HEIGHT, MAX_HEIGHT)

			ctx.fillStyle = 'red'
			// 順序同 border-radios
			for (let i = 0; i < 4; i++) {
				const x = i % 3 === 0 ? rx - PADDING : rx + MAX_HEIGHT - PADDING,
					y = i < 2 ? ry - PADDING : ry + MAX_HEIGHT - PADDING
				ctx.fillRect(x, y, DOUBLE_PADDING, DOUBLE_PADDING)
			}
		}

		draw()

		const checkMouseEnterCorner = (
			{ clientX, clientY, left, top },
			passCallback,
			failCallback,
		) => {
			const x = clientX - left,
				y = clientY - top
			for (let i = 0; i < 4; i++) {
				const [rx, ry] = rectPos.current
				const cx = i % 3 === 0 ? rx - PADDING : rx + MAX_HEIGHT - PADDING,
					cy = i < 2 ? ry - PADDING : ry + MAX_HEIGHT - PADDING
				if (
					x >= cx &&
					x <= cx + DOUBLE_PADDING &&
					y >= cy &&
					y <= cy + DOUBLE_PADDING
				) {
					canvas.style.cursor = i % 2 === 0 ? 'nwse-resize' : 'nesw-resize'
					passCallback?.({ x, y, i })
					return true
				} else {
					canvas.style.cursor = 'auto'
				}
			}
			failCallback?.({ x, y, i: -1 })
			return false
		}

		const checkMouseEnterRect = ({ clientX, clientY, left, top }, callback) => {
			const x = clientX - left,
				y = clientY - top
			const [rx, ry] = rectPos.current
			if (x >= rx && x <= rx + MAX_HEIGHT && y >= ry && y <= ry + MAX_HEIGHT) {
				canvas.style.cursor = 'move'
				callback?.({ x, y })
				return true
			}
			return false
		}

		const onMousedown = ({ clientX, clientY }) => {
			const { left, top } = canvas.getBoundingClientRect()
			checkMouseEnterCorner(
				{ clientX, clientY, left, top },
				({ x, y, i }) => {
					draggingRef.current.cornerIndex = i
					document.body.style.userSelect = 'none'
				},
				() => {
					checkMouseEnterRect({ clientX, clientY, left, top }, ({ x, y }) => {
						const [rx, ry] = rectPos.current
						draggingRef.current.rect = true
						draggingRef.current.rectPressDownPos = [x - rx, y - ry]
						document.body.style.userSelect = 'none'
					})
				},
			)
		}

		const onMousemove = ({ clientX, clientY }) => {
			const { left, top } = canvas.getBoundingClientRect()
			if (draggingRef.current.cornerIndex > -1) {
				console.log(`index: ${draggingRef.current.cornerIndex}, 正在被拖曳！`)
			} else if (draggingRef.current.rect) {
				const [rpdx, rpdy] = draggingRef.current.rectPressDownPos
				const x = clientX - left,
					y = clientY - top
				let newX = x - rpdx,
					newY = y - rpdy

				if (newX < PADDING) {
					newX = PADDING
				} else if (newX + MAX_HEIGHT + PADDING > MAX_WIDTH) {
					newX = MAX_WIDTH - MAX_HEIGHT + PADDING
				}

				if (newY < PADDING) {
					newY = PADDING
				} else if (newY + MAX_HEIGHT + PADDING > MAX_HEIGHT) {
					newY = PADDING
				}

				rectPos.current = [newX, newY]
				draw()
			} else {
				checkMouseEnterCorner({ clientX, clientY, left, top }, null, () => {
					checkMouseEnterRect({ clientX, clientY, left, top })
				})
			}
		}

		const onMouseup = () => {
			if (draggingRef.current.cornerIndex > -1) {
				draggingRef.current.cornerIndex = -1
				document.body.style.userSelect = null
			} else if (draggingRef.current.rect) {
				draggingRef.current.rect = false
				document.body.style.userSelect = null
			}
		}

		window.addEventListener('mousedown', onMousedown)
		window.addEventListener('mousemove', onMousemove)
		window.addEventListener('mouseup', onMouseup)
		return () => {
			document.body.style.userSelect = null
			window.removeEventListener('mousedown', onMousedown)
			window.removeEventListener('mousemove', onMousemove)
			window.removeEventListener('mouseup', onMouseup)
		}
	}, [])

	return (
		<PageContent>
			<div>首頁</div>
			<canvas id="canvas" width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
		</PageContent>
	)
}
