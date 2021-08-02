import React from 'react'
import { OrderedListOutlined } from '@ant-design/icons'
import { PageContent } from '@/components/page-content'
import { PageTitle } from '@/components/page-title'
import { EditorModal } from '@/pages/billboard/editor-modal'
import { DataList } from '@/pages/billboard/data-list'
import { SearchPanel } from '@/pages/billboard/search-panel'
import { ListProvider } from '@/pages/billboard/service/list'
import { EditorModalProvider } from '@/pages/billboard/service/editor-modal'

export default () => {
	return (
		<PageContent>
			<PageTitle title={'公佈欄'} icon={OrderedListOutlined} just />
			<ListProvider>
				<EditorModalProvider>
					<SearchPanel />
					<DataList />
					<EditorModal />
				</EditorModalProvider>
			</ListProvider>
		</PageContent>
	)
}
