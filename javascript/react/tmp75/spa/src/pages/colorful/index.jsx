import React from 'react'
import { PageContent } from '@/components/page-content'
import { PageTitle } from '@/components/page-title'
import { BgColorsOutlined } from '@ant-design/icons'

export default () => {
	return (
		<PageContent>
			<PageTitle title={'多主題色'} icon={BgColorsOutlined} just />
		</PageContent>
	)
}
