import { createElement, useEffect, useRef } from 'react'
import { render } from 'react-dom'

const Message = ({ message, direction }) => {
	const msgRef = useRef(null)
	useEffect(() => {
		if (direction > 0) {
			setTimeout(() => msgRef.current.remove(), direction)
		}
	}, [])
	return (
		<div
			ref={msgRef}
			className="bg-white color-black mt-4 rounded-md px-4 py-2 flex items-center w-full shadow-lg animate-fade-side-in-quick"
		>
			{message}
		</div>
	)
}

/**
 * @param {'success' | 'danger'} type
 * @param {string} message
 * @param {number} direction 0 為永久
 */
export const createMessage = (
	message = '',
	type = 'success',
	direction = 3000,
) => {
	const container = document.getElementById('message-container')
	const el = document.createDocumentFragment()
	const msg = createElement(Message, { message, type, direction })
	render(msg, el)
	container.append(el)
}
