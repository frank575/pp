import React from 'react'
import { AppContent } from '@/components/app/content'
import { AppTitle } from '@/components/app/title'
import { BugOutlined } from '@ant-design/icons'

export default () => {
	return (
		<AppContent>
			<AppTitle title={'開發調適'} icon={BugOutlined} just />
		</AppContent>
	)
}
