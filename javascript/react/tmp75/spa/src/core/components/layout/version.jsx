import { useMemo } from 'react'
import { createClassName } from '75l'
import { useVersion } from '@/core/hooks/use-version'

export const Version = ({ className: pclassName }) => {
	const className = useMemo(
		() =>
			createClassName({
				'p-3 text-center': true,
				[pclassName]: pclassName != null,
			}),
		[pclassName],
	)

	const version = useVersion(e => e.version)

	return <div className={className}>{version}</div>
}
