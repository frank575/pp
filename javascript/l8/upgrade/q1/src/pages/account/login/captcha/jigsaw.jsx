import styles from './index.module.css'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const JIGSAW_MASK_WIDTH = 60
const JIGSAW_MASK_HEIGHT = 46.7
const DRAG_PANEL_WIDTH = 48

export const Jigsaw = ({ onSuccess }) => {
	const containerRef = useRef(null)
	const imgRef = useRef(null)
	const jigsawRef = useRef(null)
	const dragRef = useRef(null)
	const isEndRef = useRef(false)
	const [isDrag, setIsDrag] = useState(false)
	const [beginDragX, setBeginDragX] = useState(0)
	const [currentX, setCurrentX] = useState(0)
	const [maskJigsawX, setMaskJigsawX] = useState(0)
	const [maskJigsawY, setMaskJigsawY] = useState(0)
	const jigsawPosition = useMemo(
		() => `${maskJigsawX}px ${maskJigsawY}px`,
		[maskJigsawX, maskJigsawY],
	)
	const dragStart = useCallback(ev => {
		if (isEndRef.current) return
		setIsDrag(true)
		setBeginDragX(ev.clientX)
	}, [])
	const dragging = useCallback(
		ev => {
			if (!isDrag) return
			const x = ev.clientX - beginDragX
			const containerWidth = containerRef.current.clientWidth
			if (x < 0) return setCurrentX(0)
			else if (x + DRAG_PANEL_WIDTH > containerWidth - 4)
				return setCurrentX(containerWidth - DRAG_PANEL_WIDTH - 8)
			else setCurrentX(x)
		},
		[isDrag, beginDragX],
	)
	const dragEnd = useCallback(
		ev => {
			if (isEndRef.current || !isDrag) return
			setIsDrag(false)
			if (currentX > maskJigsawX - 4 && currentX < maskJigsawX + 4) {
				console.log('驗證成功')
				isEndRef.current = true
				onSuccess?.()
			} else {
				console.log('驗證成功')
				setCurrentX(0)
				initPosition()
			}
		},
		[currentX, maskJigsawX],
	)

	const initPosition = useCallback(() => {
		const containerWidth = containerRef.current.clientWidth
		const imgNaturalWidth = imgRef.current.naturalWidth
		const imgNaturalHeight = imgRef.current.naturalHeight
		const containerHeight =
			(containerWidth / imgNaturalWidth) * imgNaturalHeight
		const halfContainerWidth = containerWidth / 2
		const beginX =
			halfContainerWidth +
			Math.random() * halfContainerWidth -
			JIGSAW_MASK_WIDTH
		const beginY = Math.random() * containerHeight - JIGSAW_MASK_HEIGHT
		isEndRef.current = false
		setMaskJigsawX(beginX)
		setMaskJigsawY(beginY < 0 ? 0 : beginY)
	}, [])

	const bindEvents = useCallback(() => {
		dragRef.current.addEventListener('mousedown', dragStart)
		window.addEventListener('mousemove', dragging)
		window.addEventListener('mouseup', dragEnd)
		return () => {
			dragRef.current.removeEventListener('mousedown', dragStart)
			window.removeEventListener('mousemove', dragging)
			window.removeEventListener('mouseup', dragEnd)
		}
	}, [dragStart, dragging, dragEnd])

	useEffect(initPosition, [])
	useEffect(bindEvents, [bindEvents])

	return (
		<div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center  select-none">
			<div className="bg-black opacity-70 fixed left-0 top-0 w-full h-full" />
			<div className="w-96 z-10">
				<div
					ref={containerRef}
					className="w-full relative overflow-hidden pointer-events-none"
				>
					<img ref={imgRef} src="/chihuahua.jpg" alt="" />
					{useMemo(
						() => (
							<img
								className="opacity-70 absolute"
								style={{
									width: JIGSAW_MASK_WIDTH,
									height: JIGSAW_MASK_HEIGHT,
									left: maskJigsawX,
									top: maskJigsawY,
								}}
								src="/jigsaw-mask.png"
								alt=""
							/>
						),
						[maskJigsawX, maskJigsawY],
					)}
					{useMemo(
						() => (
							<img
								ref={jigsawRef}
								className={styles.jigsaw}
								src="/chihuahua.jpg"
								alt=""
								style={{
									left: currentX,
									top: 0,
									transform: `translateX(-${maskJigsawX}px)`,
									maskPosition: jigsawPosition,
									WebkitMaskPosition: jigsawPosition,
								}}
							/>
						),
						[maskJigsawX, jigsawPosition, currentX],
					)}
				</div>
				<div className="w-full bg-white rounded-full mt-4 p-1">
					<div
						ref={dragRef}
						className="bg-primary rounded-full w-12 h-6 cursor-move"
						style={{ transform: `translateX(${currentX}px)` }}
					/>
				</div>
				<div className="text-white mt-4 text-center">請拖曳到對應的位置</div>
			</div>
		</div>
	)
}
