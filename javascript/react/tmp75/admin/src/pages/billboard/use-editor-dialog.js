import { useMitt } from 'react-mitt'
import { BILLBOARD_EDITOR_DIALOG } from '@/enums/e-mitt-type'

export const useEditorDialog = () => {
	const { emitter } = useMitt()
	const onOpenEditorDialog = (status, data) => {
		emitter.emit(BILLBOARD_EDITOR_DIALOG, {
			status,
			data,
		})
	}
	return {
		onOpenEditorDialog,
	}
}
