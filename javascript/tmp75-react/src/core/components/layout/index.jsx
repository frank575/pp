import { Header } from '@/core/components/layout/header'
import { SideMenu } from '@/core/components/layout/side-menu'

export const Layout = ({ children }) => {
	return (
		<div className="bg-gray-200 min-w-full min-h-screen">
			<Header />
			<div className="flex">
				<SideMenu />
				<div className="flex-1">{children}</div>
			</div>
		</div>
	)
}
