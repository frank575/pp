import { useStore } from '@/core/store'
import { useTitle } from '@jsl-hooks'
import { PrivateRoute } from '@/core/components/routes/components/private-route'
import { useEffect } from 'react'
import { useLocation } from 'react-router'

export const WithTitleSideKeyPrivateRoute = props => {
	const location = useLocation()
	const setSideSelectedKeys = useStore(e => e.setSideSelectedKeys)
	useTitle(props.title)
	useEffect(() => {
		setSideSelectedKeys([props.sideKey])
	}, [location])
	return <PrivateRoute {...props} />
}
