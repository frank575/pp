import React, { useEffect } from 'react'
import { useStore } from '@/core/store'
import { useTitle } from '@jsl-hooks'
import { PrivateRoute } from '@/core/components/routes/private-route'

export const WithTitleSideKeyPrivateRoute = ({ title, sideKey, ...rest }) => {
	const setSideSelectedKeys = useStore(e => e.setSideSelectedKeys)
	useTitle(title)
	useEffect(() => {
		setSideSelectedKeys([sideKey])
	}, [])

	return <PrivateRoute {...rest} />
}
