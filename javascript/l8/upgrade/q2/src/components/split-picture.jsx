import { useCallback, useEffect, useRef, useState } from 'react'
import { useInitialRef } from '@jsl-react/hooks'
import { Button } from '@/components/button'
import { Modal } from '@/components/modal'

const CANVAS_WIDTH = 504
const CANVAS_HEIGHT = 302
const PADDING = 4
const DOUBLE_PADDING = PADDING * 2
const MAX_WIDTH = CANVAS_WIDTH - DOUBLE_PADDING
const MAX_HEIGHT = CANVAS_HEIGHT - DOUBLE_PADDING
const MIN_RECT_SIZE = 120

export const SplitPicture = ({ src, onSplit, type = 'base64' }) => {
	const [visible, setVisible] = useState(false)
	const canvasRef = useRef(null)
	const splitCanvasRef = useRef(null)
	/**
	 * @type {React.MutableRefObject<{padding: number, minRectSize: number, canvasWidth: number, maxHeight: number, doublePadding: number, maxRectSize: number, canvasHeight: number, maxWidth: number}>}
	 */
	const canvasState = useInitialRef(() => ({
		canvasWidth: CANVAS_WIDTH,
		canvasHeight: CANVAS_HEIGHT,
		padding: PADDING,
		doublePadding: DOUBLE_PADDING,
		maxWidth: MAX_WIDTH,
		maxHeight: MAX_HEIGHT,
		maxRectSize: MAX_HEIGHT,
		minRectSize: MIN_RECT_SIZE,
	}))
	const rectSize = useInitialRef(() => [
		canvasState.current.minRectSize,
		canvasState.current.minRectSize,
	])
	const rectPos = useInitialRef(() => [0, 0])
	const draggingRef = useInitialRef(() => ({
		cornerIndex: -1,
		cornerPressDownPos: 0,
		cornerPressDownRectWidth: [rectSize.current[0], rectSize.current[1]],
		rect: false,
		rectPressDownPos: [0, 0],
	}))
	const [imgSrc, setImgSrc] = useState(null)
	const imgRef = useRef(null)
	const [imgLoaded, setImgLoaded] = useState(false)

	const initCanvas = useCallback(() => {
		const canvas = canvasRef.current
		const img = new Image()
		imgRef.current = img
		img.src = imgSrc
		img.crossOrigin = '*'
		img.onload = () => {
			// TODO 寬高比動態調整有空再寫
			setImgLoaded(true)
			const { padding, doublePadding, maxWidth, canvasWidth } =
				canvasState.current
			const { width: w, height: h } = img
			const scale = w / maxWidth
			const newH = h / scale
			const canvasHeight = newH + doublePadding
			canvasState.current.maxRectSize = newH
			canvasState.current.canvasHeight = canvasHeight
			canvasState.current.maxHeight = newH
			rectSize.current = [newH, newH]
			rectPos.current = [padding + maxWidth / 2 - newH / 2, padding]
			canvas.height = canvasHeight
			draw()
		}
	}, [imgSrc])

	const draw = useCallback(() => {
		const {
			canvasWidth,
			canvasHeight,
			padding,
			maxWidth,
			maxHeight,
			doublePadding,
		} = canvasState.current
		const ctx = canvasRef.current.getContext('2d')
		const [rx, ry] = rectPos.current
		const [rw, rh] = rectSize.current
		const hrw = rw / 2

		ctx.clearRect(0, 0, canvasWidth, canvasHeight)
		ctx.drawImage(imgRef.current, padding, padding, maxWidth, maxHeight)
		ctx.fillStyle = 'rgba(0, 0, 0, .5)'
		ctx.fillRect(padding, padding, maxWidth, maxHeight)

		ctx.save()
		ctx.beginPath()
		ctx.arc(rx + hrw, ry + hrw, hrw, 0, Math.PI * 2)
		ctx.clip()
		ctx.drawImage(imgRef.current, padding, padding, maxWidth, maxHeight)
		ctx.restore()
		ctx.strokeStyle = '#3a86ff'
		ctx.strokeRect(rx, ry, rw, rh)

		ctx.fillStyle = '#fff'
		// 順序同 border-radios
		for (let i = 0; i < 4; i++) {
			const x = i % 3 === 0 ? rx - padding : rx + rw - padding,
				y = i < 2 ? ry - padding : ry + rh - padding
			ctx.fillRect(x, y, doublePadding, doublePadding)
			ctx.strokeRect(x, y, doublePadding, doublePadding)
		}
	}, [])

	const checkMouseEnterCorner = useCallback(
		({ clientX, clientY, left, top }, passCallback, failCallback) => {
			const canvas = canvasRef.current
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
		},
		[],
	)

	const checkMouseEnterRect = useCallback(
		({ clientX, clientY, left, top }, callback) => {
			const canvas = canvasRef.current
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
		},
		[],
	)

	const onMousedown = useCallback(({ clientX, clientY }) => {
		const canvas = canvasRef.current
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
	}, [])

	const onMousemove = useCallback(({ clientX, clientY }) => {
		const canvas = canvasRef.current
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
			} else if (newX + rw > maxWidth) {
				newX = maxWidth - rw + padding
			}

			if (newY < padding) {
				newY = padding
			} else if (newY + rh > maxHeight) {
				newY = maxHeight - rh + padding
			}

			rectPos.current = [newX, newY]
			draw()
			// console.log(`矩形正在被拖曳`)
		} else {
			const pos = { clientX, clientY, left, top }
			checkMouseEnterCorner(pos, null, () => {
				checkMouseEnterRect(pos)
			})
		}
	}, [])

	const onMouseup = useCallback(() => {
		if (draggingRef.current.cornerIndex > -1) {
			draggingRef.current.cornerIndex = -1
			document.body.style.userSelect = null
		} else if (draggingRef.current.rect) {
			draggingRef.current.rect = false
			document.body.style.userSelect = null
		}
	}, [])

	const onSplitPicture = useCallback(() => {
		if (imgRef.current == null) return

		const { maxWidth, maxHeight, padding } = canvasState.current
		const splitCanvas = splitCanvasRef.current
		const sctx = splitCanvas.getContext('2d')
		const image = imgRef.current
		const [rw, rh] = rectSize.current
		const [rx, ry] = rectPos.current
		splitCanvas.width = rw
		splitCanvas.height = rh
		sctx.clearRect(0, 0, rw, rh)
		sctx.drawImage(image, -rx + padding, -ry + padding, maxWidth, maxHeight)

		if (type === 'base64') {
			onSplit?.(splitCanvas.toDataURL('image/png'))
		} else if (type === 'blob') {
			splitCanvas.toBlob(blob => onSplit?.(blob))
		}

		onCancel()
	}, [])

	const onCancel = () => {
		setVisible(false)
		setImgSrc(null)
	}

	useEffect(() => {
		if (src == null) return
		setImgSrc(src)
		setVisible(true)
	}, [src])

	useEffect(() => {
		if (visible) {
			initCanvas()
			window.addEventListener('mousedown', onMousedown)
			window.addEventListener('mousemove', onMousemove)
			window.addEventListener('mouseup', onMouseup)
			return () => {
				document.body.style.userSelect = null
				window.removeEventListener('mousedown', onMousedown)
				window.removeEventListener('mousemove', onMousemove)
				window.removeEventListener('mouseup', onMouseup)
			}
		}
	}, [visible])

	return (
		<Modal visible={visible} onCancel={onCancel}>
			<div style={{ width: CANVAS_WIDTH }}>
				<canvas
					ref={canvasRef}
					width={canvasState.current.canvasWidth}
					height={canvasState.current.canvasHeight}
				/>
				<canvas className="hidden" ref={splitCanvasRef} width={0} height={0} />

				{imgLoaded ? (
					<div className="text-center mt-2">
						{' '}
						<Button onClick={onSplitPicture}>確定</Button>
					</div>
				) : null}
			</div>
		</Modal>
	)
}
