import { useList } from '@/pages/billboard/service/use-list'
import { useProvider } from '@jsl-hooks'
import { useEditorModal } from '@/pages/billboard/service/use-editor-modal'

const index = () => {
	const list = useList()
	const editorDialog = useEditorModal({ getList: list.getList })

	return {
		list,
		editorDialog,
	}
}

export const { Provider: BillboardProvider, inject: useBillboardService } =
	useProvider(index)
