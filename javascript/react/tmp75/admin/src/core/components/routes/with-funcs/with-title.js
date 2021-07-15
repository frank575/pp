import { useTitle } from '@jsl-hooks'

export const withTitle = title => () => {
	useTitle(title)
}
