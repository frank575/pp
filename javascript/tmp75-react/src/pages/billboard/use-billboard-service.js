import { useList } from '@/pages/billboard/use-list'
import { useProvider } from '@jsl-react/hooks'
import { useEditorDialog } from '@/pages/billboard/use-editor-dialog'

const service = () => {
	const list = useList()
	const editorDialog = useEditorDialog()
	return {
		...list,
		...editorDialog,
	}
}

export const { Provider: BillboardProvider, inject: useBillboardService } =
	useProvider(service)
