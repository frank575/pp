import styles from './index.module.css'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useHttp } from '@/core/hooks/http/use-http'
import { Spinner } from '@/components/spinner'
import { createMessage } from '@/lib/create-message'
import { useVisible } from '@/hooks/use-visible'

const JIGSAW_MASK_WIDTH = 60
const JIGSAW_MASK_HEIGHT = 46.7
const DRAG_PANEL_WIDTH = 48

export const Jigsaw = ({ visible, onChange, onLogin }) => {
	const { http } = useHttp()
	const [_visible, setVisible] = useVisible(visible, onChange)
	const containerRef = useRef(null)
	const imgRef = useRef(null)
	const dragRef = useRef(null)
	const isEndRef = useRef(false)
	const [imgLoading, setImgLoading] = useState(true)
	const [url, setUrl] = useState('')
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
		async ev => {
			if (isEndRef.current || !isDrag) return
			setIsDrag(false)
			if (currentX > maskJigsawX - 4 && currentX < maskJigsawX + 4) {
				isEndRef.current = true
				const res = await onLogin?.()
				if (res && res.data.success) return
			} else {
				createMessage('驗證失敗，請拖曳到正確位置', 'danger')
			}
			isEndRef.current = false
			setCurrentX(0)
			initPosition()
		},
		[currentX, maskJigsawX],
	)

	const initPosition = useCallback(
		() =>
			new Promise(async resolve => {
				setImgLoading(true)
				const res = await http.get('https://dog.ceo/api/breeds/image/random')
				const url = res.data.message
				setUrl(url)
				const img = new Image()
				img.src = url
				img.onload = () => {
					setImgLoading(false)
					const containerWidth = containerRef.current.clientWidth
					const imgNaturalWidth = img.naturalWidth
					const imgNaturalHeight = img.naturalHeight
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
					resolve()
				}
			}),
		[],
	)

	const bindEvents = useCallback(() => {
		if (_visible) {
			dragRef.current?.addEventListener('mousedown', dragStart)
			window.addEventListener('mousemove', dragging)
			window.addEventListener('mouseup', dragEnd)
			return () => {
				dragRef.current?.removeEventListener('mousedown', dragStart)
				window.removeEventListener('mousemove', dragging)
				window.removeEventListener('mouseup', dragEnd)
			}
		}
	}, [dragStart, dragging, dragEnd, http, _visible])

	useEffect(() => {
		if (_visible) {
			initPosition()
		}
	}, [_visible])

	useEffect(bindEvents, [bindEvents])

	return _visible ? (
		<div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center select-none">
			<div
				className="bg-black opacity-70 fixed left-0 top-0 w-full h-full"
				onClick={() => setVisible(false)}
			/>
			<div className="w-96 z-10">
				<div
					ref={containerRef}
					className="w-full relative overflow-hidden pointer-events-none flex items-center justify-center"
					style={{ minWidth: 108, minHeight: 108 }}
				>
					{imgLoading ? (
						<Spinner color={'#faad14'} size={64} />
					) : (
						<>
							<img className={'w-full'} ref={imgRef} src={url} alt="" />
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
								className={styles.jigsaw}
								src={url}
								alt=""
								style={{
									left: currentX,
									top: 0,
									transform: `translateX(-${maskJigsawX}px)`,
									maskPosition: jigsawPosition,
									WebkitMaskPosition: jigsawPosition,
								}}
							/>
						</>
					)}
				</div>
				{imgLoading ? null : (
					<>
						<div className="w-full bg-white rounded-full mt-4 p-1">
							<div
								ref={dragRef}
								className="bg-primary rounded-full w-12 h-6 cursor-move"
								style={{ transform: `translateX(${currentX}px)` }}
							/>
						</div>
						<div className="text-white mt-4 text-center">
							請拖曳到對應的位置
						</div>
					</>
				)}
			</div>
		</div>
	) : null
}
