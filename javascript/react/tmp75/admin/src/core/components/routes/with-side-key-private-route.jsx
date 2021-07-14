import React, { useEffect } from 'react'
import { useStore } from '@/core/store'
import { PrivateRoute } from '@/core/components/routes/private-route'

export const WithSideKeyPrivateRoute = ({ sideKey, ...rest }) => {
	const setSideSelectedKeys = useStore(e => e.setSideSelectedKeys)
	useEffect(() => {
		setSideSelectedKeys([sideKey])
	}, [])

	return <PrivateRoute {...rest} />
}
