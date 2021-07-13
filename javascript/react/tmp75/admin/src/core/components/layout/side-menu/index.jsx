import React, { useMemo } from 'react'
import { Menu } from 'antd'
import { userSideMenuService } from '@/core/components/layout/side-menu/user-side-menu-service'
import {
	BgColorsOutlined,
	OrderedListOutlined,
	ScheduleOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { SubMenu, Item } = Menu
export const SideMenu = () => {
	const sideMenuService = userSideMenuService()

	return useMemo(
		() => (
			<Menu
				className="max-w-side-menu"
				mode="inline"
				theme={'dark'}
				inlineCollapsed={sideMenuService.menuCollapsed}
				selectedKeys={sideMenuService.selectedKeys}
			>
				<Item key={'billboard'} icon={<OrderedListOutlined />}>
					<Link to={'/billboard'}>公佈欄</Link>
				</Item>
				<Item key={'colorful'} icon={<BgColorsOutlined />}>
					<Link to={'/colorful'}>多主題色</Link>
				</Item>
				<SubMenu key={'nesting'} title={'嵌套選單'}>
					<SubMenu key={'nesting-1'} title={'第二層'}>
						<Item key={'task'} icon={<ScheduleOutlined />}>
							<Link to={'/task'}>任務管理(第三層)</Link>
						</Item>
					</SubMenu>
					<Item key={'billboard'} icon={<OrderedListOutlined />}>
						<Link to={'/billboard'}>公佈欄(第二層)</Link>
					</Item>
				</SubMenu>
			</Menu>
		),
		[sideMenuService.menuCollapsed, sideMenuService.selectedKeys],
	)
}
