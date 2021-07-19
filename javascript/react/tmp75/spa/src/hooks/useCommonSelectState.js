import { useEffect, useRef, useState } from 'react'

export const useCommonSelectState = ({ defaultValue, value, onChange }) => {
	const hasValue = useRef(value !== undefined)
	const [v, setV] = useState(defaultValue)
	useEffect(() => {
		if (hasValue.current) {
			setV(value)
		}
	}, [value])
	const _onChange = (v, el) => {
		if (!hasValue.current) {
			setV(v)
		}
		onChange && onChange(v, el)
	}
	return [v, _onChange]
}
