import styles from './index.module.css'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const JIGSAW_MASK_WIDTH = 60
const JIGSAW_MASK_HEIGHT = 46.7

export const Jigsaw = () => {
	const containerRef = useRef(null)
	const imgRef = useRef(null)
	const jigsawRef = useRef(null)
	const dragRef = useRef(null)
	const [maskJigsawX, setMaskJigsawX] = useState(0)
	const [maskJigsawY, setMaskJigsawY] = useState(0)
	const jigsawPosition = useMemo(
		() => `${maskJigsawX}px ${maskJigsawY}px`,
		[maskJigsawX, maskJigsawY],
	)
	const dragStart = useCallback(ev => {}, [])
	const dragging = useCallback(ev => {}, [])
	const dragEnd = useCallback(ev => {}, [])

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
	}, [])

	useEffect(() => {
		initPosition()
		bindEvents()
	}, [])

	return (
		<div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center  select-none">
			<div className="bg-black opacity-70 fixed left-0 top-0 w-full h-full" />
			<div className="w-96 z-10">
				<div
					ref={containerRef}
					className="w-full relative overflow-hidden pointer-events-none"
				>
					<img ref={imgRef} src="/chihuahua.jpg" alt="" />
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
					<img
						ref={jigsawRef}
						className={styles.jigsaw}
						src="/chihuahua.jpg"
						alt=""
						style={{
							left: 0,
							top: 0,
							transform: `translateX(-${maskJigsawX}px)`,
							maskPosition: jigsawPosition,
							WebkitMaskPosition: jigsawPosition,
						}}
					/>
				</div>
				<div className="w-full bg-white rounded-full mt-4 p-1">
					<div
						ref={dragRef}
						className="bg-primary rounded-full w-12 h-6 cursor-move"
					/>
				</div>
				<div className="text-white mt-4 text-center">請拖曳到對應的位置</div>
			</div>
		</div>
	)
}
