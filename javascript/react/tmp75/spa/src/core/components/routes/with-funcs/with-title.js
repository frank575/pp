import { useTitle } from '@jsl-react'

export const withTitle = title => () => {
	useTitle(title)
}
