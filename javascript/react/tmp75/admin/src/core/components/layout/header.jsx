import React from 'react'
import { Button } from 'antd'
import { LogoutOutlined, MenuOutlined } from '@ant-design/icons'
import { useStore } from '@/core/store'

export const Header = () => {
	const setMenuCollapsed = useStore(e => e.setMenuCollapsed)
	const onLogout = useStore(e => e.onLogout)
	const onToggleCollapsed = () => setMenuCollapsed(e => !e)

	return (
		<div className="bg-white flex justify-between items-center py-1 px-2 shadow-md">
			<Button
				className="flex justify-center items-center"
				icon={<MenuOutlined />}
				onClick={onToggleCollapsed}
			/>
			<div className="font-bold text-lg">TMP75-REACT-ADMIN</div>
			<Button
				className="flex justify-center items-center"
				icon={<LogoutOutlined />}
				onClick={onLogout}
			/>
		</div>
	)
}
