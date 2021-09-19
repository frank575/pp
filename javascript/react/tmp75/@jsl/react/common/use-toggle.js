/// toggle useState
/// v0 {author: frank575}

import { useCallback, useState, Dispatch, SetStateAction } from 'react'

/**
 * @type {(defaultValue: boolean = false) => [boolean, () => void, Dispatch<SetStateAction<boolean>>]}
 */
export const useToggle = (defaultValue = false) => {
	const [value, setValue] = useState(defaultValue)

	const toggleValue = useCallback(() => setValue(e => !e), [setValue])

	return [value, toggleValue, setValue]
}
