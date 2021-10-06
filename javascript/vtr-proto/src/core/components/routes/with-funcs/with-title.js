import { useTitle } from '75l-react'

export const withTitle = title => () => {
	useTitle(title)
}
