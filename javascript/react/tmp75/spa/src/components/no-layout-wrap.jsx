import { ErrorBoundary } from '@/core/components/error-boundary'

export const NoLayoutWrap = ({ children, title }) => {
	return (
		<div className="bg-gray-200 min-w-max min-h-screen flex items-center justify-center ">
			<div className="p-6 bg-white shadow-md">
				<ErrorBoundary>
					<div className="text-lg font-bold mb-4 text-center">{title}</div>
					{children}
				</ErrorBoundary>
			</div>
		</div>
	)
}
