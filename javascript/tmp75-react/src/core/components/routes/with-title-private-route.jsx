import { useTitle } from '@jsl-react/hooks/use-title'
import { PrivateRoute } from '@/core/components/routes/private-route'

export const WithTitlePrivateRoute = props => {
	useTitle(props.title)
	return <PrivateRoute {...props} />
}
