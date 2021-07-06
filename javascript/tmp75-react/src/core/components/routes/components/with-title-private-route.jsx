import { useTitle } from '@jsl-hooks'
import { PrivateRoute } from '@/core/components/routes/components/private-route'

export const WithTitlePrivateRoute = props => {
	useTitle(props.title)
	return <PrivateRoute {...props} />
}
