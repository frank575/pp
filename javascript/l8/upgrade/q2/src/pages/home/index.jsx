import { PageContent } from '@/components/page-content'
import { useEffect, useRef } from 'react'
import { useInitialRef } from '@jsl-react/hooks'

const MIN_RECT_SIZE = 120

export default () => {
	/**
	 * @type {React.MutableRefObject<{padding: number, minRectSize: number, canvasWidth: number, maxHeight: number, doublePadding: number, maxRectSize: number, canvasHeight: number, maxWidth: number}>}
	 */
	const canvasState = useInitialRef(() => {
		const canvasWidth = 504
		const canvasHeight = 302
		const padding = 5
		const doublePadding = padding * 2
		const maxWidth = canvasWidth - doublePadding
		const maxHeight = canvasHeight - doublePadding

		return {
			canvasWidth,
			canvasHeight,
			padding,
			doublePadding,
			maxWidth,
			maxHeight,
			maxRectSize: maxHeight,
			minRectSize: MIN_RECT_SIZE,
		}
	})
	const rectSize = useRef([
		canvasState.current.minRectSize,
		canvasState.current.minRectSize,
	])
	const rectPos = useRef([
		canvasState.current.padding +
			canvasState.current.canvasWidth / 2 -
			rectSize.current[0] / 2,
		canvasState.current.padding +
			canvasState.current.canvasHeight / 2 -
			rectSize.current[1] / 2,
	])
	const draggingRef = useRef({
		cornerIndex: -1,
		cornerPressDownPos: 0,
		cornerPressDownRectWidth: [rectSize.current[0], rectSize.current[1]],
		rect: false,
		rectPressDownPos: [0, 0],
	})

	useEffect(() => {
		const canvas = document.getElementById('canvas')
		const ctx = canvas.getContext('2d')
		const img = new Image()
		img.src =
			'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2021%2F03%2F09%2Fchihuahua-laying-down-wooden-floor-1675701502-2000.jpg'
		img.onload = () => {
			const { doublePadding, maxRectSize, minRectSize } = canvasState.current
			const { width: w, height: h } = img
			const scale = w / canvasState.current.maxWidth
			const newH = h / scale
			const canvasHeight = newH + doublePadding
			canvasState.current.maxRectSize = newH
			canvasState.current.canvasHeight = canvasHeight
			canvasState.current.maxHeight = newH
			if (newH < minRectSize) {
				canvasState.current.minRectSize = newH
			} else {
				canvasState.current.minRectSize = MIN_RECT_SIZE
			}
			canvas.height = canvasHeight
			draw()
		}

		const draw = () => {
			const { canvasWidth, canvasHeight, padding, maxWidth, doublePadding } =
				canvasState.current
			ctx.clearRect(0, 0, canvasWidth, canvasHeight)
			ctx.drawImage(
				img,
				padding,
				padding,
				maxWidth,
				canvas.height - doublePadding,
			)

			const [rx, ry] = rectPos.current
			const [rw, rh] = rectSize.current
			ctx.fillStyle = 'rgba(255, 255, 255, .3)'
			ctx.strokeStyle = '#3a86ff'
			ctx.fillRect(rx, ry, rw, rh)
			ctx.strokeRect(rx, ry, rw, rh)

			ctx.fillStyle = '#fff'
			// 順序同 border-radios
			for (let i = 0; i < 4; i++) {
				const x = i % 3 === 0 ? rx - padding : rx + rw - padding,
					y = i < 2 ? ry - padding : ry + rh - padding
				ctx.fillRect(x, y, doublePadding, doublePadding)
				ctx.strokeRect(x, y, doublePadding, doublePadding)
			}
		}

		const checkMouseEnterCorner = (
			{ clientX, clientY, left, top },
			passCallback,
			failCallback,
		) => {
			const { padding, doublePadding } = canvasState.current
			const x = clientX - left,
				y = clientY - top
			for (let i = 0; i < 4; i++) {
				const [rx, ry] = rectPos.current
				const [rw, rh] = rectSize.current
				const cx = i % 3 === 0 ? rx - padding : rx + rw - padding,
					cy = i < 2 ? ry - padding : ry + rh - padding
				if (
					x >= cx &&
					x <= cx + doublePadding &&
					y >= cy &&
					y <= cy + doublePadding
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
					const [rw] = rectSize.current
					const [rx, ry] = rectPos.current
					const pressX = i % 3 === 0 ? rx : rx + rw,
						pressY = i < 2 ? ry : ry + rw
					draggingRef.current.cornerIndex = i
					draggingRef.current.cornerPressDownRectWidth = rw
					draggingRef.current.cornerPressDownPos = [pressX, pressY]
					draggingRef.current.rectPressDownPos = [pressX, pressY]
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
				const { minRectSize, maxRectSize, padding, maxWidth, maxHeight } =
					canvasState.current
				const {
					cornerIndex,
					cornerPressDownRectWidth,
					cornerPressDownPos,
					rectPressDownPos,
				} = draggingRef.current
				const [rx, ry] = rectPos.current
				const [rpdx, rpdy] = rectPressDownPos
				const cpdrw = cornerPressDownRectWidth
				const [cx] = cornerPressDownPos
				const x = clientX - left
				const newrw = Math.abs(
					cpdrw + (cornerIndex % 3 === 0 ? rpdx - x : x - cx),
				)
				const rox =
						cornerIndex === 0
							? rpdx + (cpdrw - newrw)
							: cornerIndex === 1
							? rx
							: cornerIndex === 2
							? rx
							: cornerIndex === 3
							? rpdx + (cpdrw - newrw)
							: 0,
					roy =
						cornerIndex === 0
							? rpdy + (cpdrw - newrw)
							: cornerIndex === 1
							? rpdy + (cpdrw - newrw)
							: cornerIndex === 2
							? ry
							: cornerIndex === 3
							? ry
							: 0
				// console.log(rox, roy, newrw)
				if (
					newrw > maxRectSize ||
					newrw < minRectSize ||
					rox < padding ||
					rox + newrw > maxWidth + padding ||
					roy < padding ||
					roy + newrw > maxHeight + padding
				)
					return

				rectPos.current = [rox, roy]
				rectSize.current = [newrw, newrw]
				draw()
				// console.log(`index: ${cornerIndex}, 正在被拖曳！`)
			} else if (draggingRef.current.rect) {
				const { padding, maxWidth, maxHeight } = canvasState.current
				const [rpdx, rpdy] = draggingRef.current.rectPressDownPos
				const [rw, rh] = rectSize.current
				const x = clientX - left,
					y = clientY - top
				let newX = x - rpdx,
					newY = y - rpdy

				if (newX < padding) {
					newX = padding
				} else if (newX + rw + padding > maxWidth) {
					newX = maxWidth - rw + padding
				}

				if (newY < padding) {
					newY = padding
				} else if (newY + rh + padding > maxHeight) {
					newY = maxHeight - rh + padding
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
			<canvas
				id="canvas"
				width={canvasState.current.canvasWidth}
				height={canvasState.current.canvasHeight}
			/>
		</PageContent>
	)
}
