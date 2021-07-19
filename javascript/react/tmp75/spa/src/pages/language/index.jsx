import React from 'react'
import { AppContent } from '@/components/app/content'
import { AppTitle } from '@/components/app/title'
import { TranslationOutlined } from '@ant-design/icons'

export default () => {
	return (
		<AppContent>
			<AppTitle title={'多國語系'} icon={TranslationOutlined} just />
		</AppContent>
	)
}
