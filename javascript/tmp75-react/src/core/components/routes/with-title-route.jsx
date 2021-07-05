import { useTitle } from '@jsl-react/hooks/use-title'
import { PrivateRoute } from '@/core/components/routes/private-route'
import { Route } from 'react-router'

export const WithTitleRoute = props => {
	useTitle(props.title)
	return <Route {...props} />
}
