import { useMitt } from 'react-mitt'

export const useEditorDialog = () => {
	const { emitter } = useMitt()
	const onOpenEditorDialog = (status, data) => {
		emitter.emit('foo', {
			status,
			data,
		})
	}
	return {
		onOpenEditorDialog,
	}
}
