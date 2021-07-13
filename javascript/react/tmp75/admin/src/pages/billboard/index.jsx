import React from 'react'
import { OrderedListOutlined } from '@ant-design/icons'
import { BillboardProvider } from '@/pages/billboard/service'
import { MyAppContent } from '@/components/my-app-content'
import { MyTitle } from '@/components/my-title'
import { EditorModal } from '@/pages/billboard/editor-modal'
import { DataList } from '@/pages/billboard/data-list'
import { SearchPanel } from '@/pages/billboard/search-panel'

export default () => {
	return (
		<MyAppContent>
			<MyTitle title={'公佈欄'} icon={OrderedListOutlined} just />
			<BillboardProvider>
				<SearchPanel />
				<DataList />
				<EditorModal />
			</BillboardProvider>
		</MyAppContent>
	)
}
