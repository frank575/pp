import { useEffect, useRef, useState } from 'react'

/**
 * @type {
 *   <T>(props: {
 *     defaultValue: T,
 *     value: T,
 *     onChange?: (e: T, el: any) => void
 *   }) => [T, (e: T, el: any) => void]
 * }
 */
export const useCommonSelectState = ({ defaultValue, value, onChange }) => {
	const hasValue = useRef(value !== undefined)
	const [v, setV] = useState(defaultValue)
	useEffect(() => {
		if (hasValue.current) {
			setV(value)
		}
	}, [value])
	const _onChange = (e, el) => {
		if (!hasValue.current) {
			setV(e)
		}
		onChange && onChange(e, el)
	}
	return [v, _onChange]
}
