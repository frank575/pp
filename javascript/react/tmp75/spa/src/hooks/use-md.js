import { useMitt } from '@/core/hooks/use-mitt'
import { useState } from 'react'
import { SCREEN_MD_TO_CALL } from '@/core/mitt-type'

export const useMd = (defaultValue = true) => {
	const [isMd, setIsMd] = useState(defaultValue)
	const { on } = useMitt()

	on(SCREEN_MD_TO_CALL, setIsMd)

	return [isMd, setIsMd]
}
