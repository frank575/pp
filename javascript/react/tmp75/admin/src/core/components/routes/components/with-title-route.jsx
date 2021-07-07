import { useTitle } from '@jsl-hooks'
import { Route } from 'react-router'

export const WithTitleRoute = props => {
	useTitle(props.title)
	return <Route {...props} />
}
