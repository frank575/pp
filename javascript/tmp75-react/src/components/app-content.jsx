import { createClassName } from '@jsl'

export const AppContent = ({ className, children }) => {
	return (
		<main
			className={createClassName(
				{
					'p-4 bg-white shadow-md rounded-md m-4': true,
				},
				[className],
			)}
		>
			{children}
		</main>
	)
}
