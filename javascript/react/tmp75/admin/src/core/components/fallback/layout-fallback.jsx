import React from 'react'
import { AppContent } from '@/components/app-content'
import { LoadingOutlined } from '@ant-design/icons'

export const LayoutFallback = () => {
	return (
		<AppContent className="flex items-center">
			<LoadingOutlined className="mr-2" />
			正在為您努力加載頁面...
		</AppContent>
	)
}
