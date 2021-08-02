import React from 'react'
import { PageContent } from '@/components/page-content'
import { LoadingOutlined } from '@ant-design/icons'

export const LayoutFallback = () => {
	return (
		<PageContent className="flex items-center">
			<LoadingOutlined className="mr-2" />
			正在為您努力加載頁面...
		</PageContent>
	)
}
