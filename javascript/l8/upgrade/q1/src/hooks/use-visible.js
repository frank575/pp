import { useEffect, useRef, useState } from 'react'

export const useVisible = (visible, onChangeVisible) => {
	const [_visible, set_visible] = useState(visible)

	const updateVisible = vs => {
		const v = typeof vs === 'function' ? vs(_visible) : vs
		if (visible === undefined) {
			set_visible(v)
			onChangeVisible?.(v)
			return
		}
		if (onChangeVisible) {
			onChangeVisible?.(v)
		}
	}

	useEffect(() => {
		set_visible(visible)
	}, [visible])

	return [_visible, updateVisible]
}
