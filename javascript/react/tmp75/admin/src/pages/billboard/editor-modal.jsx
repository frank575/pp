import React from 'react'
import { Form, Input, Modal } from 'antd'
import { useBillboardService } from '@/pages/billboard/service'

export const EditorModal = () => {
	const { title, state, loading, onSubmit, onHide, form, onAdd } =
		useBillboardService(e => e.editorDialog)

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
