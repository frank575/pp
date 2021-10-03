import { Form, Input, Modal } from 'antd'
import { useEditorModal } from '@/pages/billboard/service/editor-modal'

export const EditorModal = () => {
	const { title, state, loading, onSubmit, onHide, form, onAdd } =
		useEditorModal(e => e)
	return (
		<Modal
			title={title}
			visible={state._visible}
			confirmLoading={loading}
			onOk={onSubmit}
			onCancel={onHide}
		>
			<Form form={form} name={'billboard-editor-dialog-form'} onFinish={onAdd}>
				<Form.Item
					label={'名稱'}
					name={'name'}
					rules={[{ required: true, message: '必填' }]}
					validateTrigger={['onChange', 'onBlur']}
				>
					<Input autoFocus />
				</Form.Item>
			</Form>
		</Modal>
	)
}
