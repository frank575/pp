import React from 'react'
import { OrderedListOutlined } from '@ant-design/icons'
import { BillboardProvider } from '@/pages/billboard/service'
import { AppContent } from '@/components/app-content'
import { AppTitle } from '@/components/app-title'
import { EditorModal } from '@/pages/billboard/editor-modal'
import { DataList } from '@/pages/billboard/data-list'
import { SearchPanel } from '@/pages/billboard/search-panel'

export default () => {
	return (
		<AppContent>
			<AppTitle title={'公佈欄'} icon={OrderedListOutlined} just />
			<BillboardProvider>
				<SearchPanel />
				<DataList />
				<EditorModal />
			</BillboardProvider>
		</AppContent>
	)
}
