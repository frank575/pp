import { createClassName } from '75l'
import { ErrorBoundary } from '@/core/components/error-boundary'

export const ContentWrapper = ({ className: pclassName, children }) => {
	const className = useMemo(
		() =>
			createClassName({
				'p-4 bg-white shadow-md rounded-md m-4': true,
				[pclassName]: pclassName != null,
			}),
		[pclassName],
	)

	return (
		<main className={className}>
			<ErrorBoundary>{children}</ErrorBoundary>
		</main>
	)
}
