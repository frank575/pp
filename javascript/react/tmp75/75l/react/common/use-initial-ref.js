/// 只會被初始化一次的 useRef
/// v0

import React, { useRef } from 'react'

export const useInitialRef = ref => {
	const isInit = useRef(false)

	const init = () => {
		if (isInit.current) return
		isInit.current = true
		if (typeof ref === 'function') {
			return ref()
		} else {
			return ref
		}
	}

	return useRef(init())
}
