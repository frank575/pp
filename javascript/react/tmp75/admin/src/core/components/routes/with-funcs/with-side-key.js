import { useEffect } from 'react'
import { useStore } from '@/core/store'

export const withSideKey = sideKey => () => {
	const setSideSelectedKeys = useStore(e => e.setSideSelectedKeys)
	useEffect(() => {
		setSideSelectedKeys([sideKey])
	}, [])
}
