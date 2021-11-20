export const CardWrap = ({ children }) => {
	return (
		<div className="bg-gray-200 min-w-max min-h-screen flex items-center justify-center">
			<div className="p-6 bg-white shadow-md rounded">{children}</div>
		</div>
	)
}
