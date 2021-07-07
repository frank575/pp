import { Form, Input, Modal } from 'antd'
import { userEditorDialogService } from '@/pages/billboard/editor-dialog/user-editor-dialog-service'

export const EditorDialog = () => {
	const editorDialogService = userEditorDialogService()
	return (
		<Modal
			title={editorDialogService.title}
			visible={editorDialogService.state._visible}
			confirmLoading={editorDialogService.loading}
			onOk={editorDialogService.onOk}
			onCancel={editorDialogService.onClose}
		>
			<Form
				form={editorDialogService.form}
				name={'billboard-editor-dialog-form'}
				onFinish={editorDialogService.onFinish}
			>
				<Form.Item
					label={'名稱'}
					name={'name'}
					rules={[{ required: true, message: '名稱為必填' }]}
					validateTrigger={['onChange', 'onBlur']}
				>
					<Input autoFocus />
				</Form.Item>
			</Form>
		</Modal>
	)
}
