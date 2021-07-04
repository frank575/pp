import { Button } from 'antd'
import { AppstoreOutlined, LogoutOutlined } from '@ant-design/icons'
import { useHeaderService } from '@/core/components/layout/header/useHeaderService'

export const Header = () => {
	const headerService = useHeaderService()
	return (
		<div className="bg-white flex justify-between items-center py-1 px-2 shadow-md">
			<Button
				className="flex justify-center items-center"
				icon={<AppstoreOutlined />}
				onClick={headerService.onToggleCollapsed}
			/>
			<div className="font-bold text-lg">TMP75-REACT</div>
			<Button
				className="flex justify-center items-center"
				icon={<LogoutOutlined />}
				onClick={headerService.onLogout}
			/>
		</div>
	)
}
