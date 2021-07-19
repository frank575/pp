import React from 'react'
import { AppContent } from '@/components/app/content'
import { AppTitle } from '@/components/app/title'
import { BgColorsOutlined } from '@ant-design/icons'

export default () => {
	return (
		<AppContent>
			<AppTitle title={'多主題色'} icon={BgColorsOutlined} just />
		</AppContent>
	)
}
