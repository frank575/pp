import { useMitt } from 'react-mitt'
import { EMittType } from '@/enums/e-mitt-type'

export const useEditorDialog = () => {
	const { emitter } = useMitt()
	const onOpenEditorDialog = (status, data) => {
		emitter.emit(EMittType.billboardEditorDialog, {
			status,
			data,
		})
	}
	return {
		onOpenEditorDialog,
	}
}
