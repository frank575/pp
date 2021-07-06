import { useStore } from '@/core/store'
import { useTitle } from '@jsl-hooks'
import { PrivateRoute } from '@/core/components/routes/components/private-route'

export const WithTitleSideKeyPrivateRoute = props => {
	const useSideSelectedKeys = useStore(e => e.useSideSelectedKeys)
	useSideSelectedKeys(props.sideKey)
	useTitle(props.title)
	return <PrivateRoute {...props} />
}
