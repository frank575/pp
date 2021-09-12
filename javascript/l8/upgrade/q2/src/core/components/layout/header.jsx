import { useAuth } from '@/core/hooks/use-auth'
import { Link } from 'react-router-dom'
import { useLayout } from '@/core/components/layout/service'

export const Header = () => {
	const auth = useAuth(e => e.auth)
	const logout = useAuth(e => e.logout)
	const setCollapse = useLayout(e => e.setCollapse)

	return (
		<header className="relative bg-white px-4 py-2 flex items-center shadow-md">
			<Link className="font-bold text-xl mr-4" to="/">
				LOGO
			</Link>
			<i
				className="fas fa-bars cursor-pointer mr-auto"
				onClick={() => setCollapse(e => !e)}
			/>
			{auth != null ? (
				<div className="flex items-center">
					<i className="far fa-bell mr-4 cursor-pointer" />
					<div className="flex items-center mr-4">
						<img className="mr-2 w-8 h-8 rounded-full" src={auth.imgLink} />
						<div className="font-bold">
							{auth.name}({auth.username})
						</div>
					</div>
					<i className="fas fa-sign-out-alt cursor-pointer" onClick={logout} />
				</div>
			) : null}
		</header>
	)
}
