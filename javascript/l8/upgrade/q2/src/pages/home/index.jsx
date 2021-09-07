import { PageContent } from '@/components/page-content'
import { useEffect, useRef } from 'react'

const CANVAS_WIDTH = 504
const CANVAS_HEIGHT = 302
const PADDING = 5
const DOUBLE_PADDING = PADDING * 2
const MAX_WIDTH = CANVAS_WIDTH - DOUBLE_PADDING
const MAX_HEIGHT = CANVAS_HEIGHT - DOUBLE_PADDING
const MAX_RECT_SIZE = MAX_HEIGHT
const MIN_RECT_SIZE = 120

export default () => {
	const rectPos = useRef([PADDING, PADDING])
	const rectSize = useRef([MAX_RECT_SIZE, MAX_RECT_SIZE])
	const draggingRef = useRef({
		cornerIndex: -1,
		cornerPressDownX: 0,
		cornerPressDownRectWidth: [rectSize.current[0], rectSize.current[1]],
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
			const [rw, rh] = rectSize.current
			ctx.fillStyle = 'rgba(255, 255, 255, .3)'
			ctx.strokeStyle = 'red'
			ctx.fillRect(rx, ry, rw, rh)
			ctx.strokeRect(rx, ry, rw, rh)

			ctx.fillStyle = 'red'
			// 順序同 border-radios
			for (let i = 0; i < 4; i++) {
				const x = i % 3 === 0 ? rx - PADDING : rx + rw - PADDING,
					y = i < 2 ? ry - PADDING : ry + rh - PADDING
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
				const [rw, rh] = rectSize.current
				const cx = i % 3 === 0 ? rx - PADDING : rx + rw - PADDING,
					cy = i < 2 ? ry - PADDING : ry + rh - PADDING
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
			const [rw, rh] = rectSize.current
			if (x >= rx && x <= rx + rw && y >= ry && y <= ry + rh) {
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
					const [rx, ry] = rectPos.current
					const [rw] = rectSize.current
					draggingRef.current.cornerPressDownX = x
					draggingRef.current.cornerPressDownRectWidth = rw
					draggingRef.current.rectPressDownPos = [x - rx, y - ry]
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
				const {
					cornerIndex,
					cornerPressDownRectWidth,
					cornerPressDownX,
					rectPressDownPos,
				} = draggingRef.current
				const [rpdx, rpdy] = draggingRef.current.rectPressDownPos
				const cpdrw = cornerPressDownRectWidth
				const cx = cornerPressDownX
				const x = clientX - left,
					y = clientY - top
				let newX = Math.abs(cpdrw + (cornerIndex % 3 === 0 ? -x - cx : x - cx))
				if (newX < MIN_RECT_SIZE || newX > MAX_RECT_SIZE) return
				rectSize.current = [newX, newX]
				draw()
				// console.log(`index: ${cornerIndex}, 正在被拖曳！`)
			} else if (draggingRef.current.rect) {
				const [rpdx, rpdy] = draggingRef.current.rectPressDownPos
				const [rw, rh] = rectSize.current
				const x = clientX - left,
					y = clientY - top
				let newX = x - rpdx,
					newY = y - rpdy

				if (newX < PADDING) {
					newX = PADDING
				} else if (newX + rw + PADDING > MAX_WIDTH) {
					newX = MAX_WIDTH - rw + PADDING
				}

				if (newY < PADDING) {
					newY = PADDING
				} else if (newY + rh + PADDING > MAX_HEIGHT) {
					newY = MAX_HEIGHT - rh + PADDING
				}

				rectPos.current = [newX, newY]
				draw()
				// console.log(`矩形正在被拖曳`)
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
