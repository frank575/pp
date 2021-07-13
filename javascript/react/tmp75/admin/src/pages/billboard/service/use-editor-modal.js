import { Form, message } from 'antd'
import { useMemo, useState } from 'react'
import { EEditorStatus } from '@/enums/e-editor-status'
import {
	fetchAddBillboardPost,
	fetchEditBillboardPost,
} from '@/core/api-service'

const initialState = () => ({
	id: undefined, // number | undefined
	name: '',
	_status: EEditorStatus.create,
	_visible: false,
})

export const useEditorModal = ({ getList }) => {
	const [form] = Form.useForm()
	const [loading, setLoading] = useState(false)
	const [state, setState] = useState(initialState())
	const title = useMemo(
		() => `${EEditorStatus.t(state._status)}消息`,
		[state._status],
	)

	const onOpen = (status, data) => {
		if (status === EEditorStatus.create) {
			const _data = initialState()
			setState({ ..._data, _status: status, _visible: true })
			form.setFieldsValue(_data)
		} else {
			setState({ ...data, _status: status, _visible: true })
			form.setFieldsValue(data)
		}
	}

	const onHide = () => {
		setState(e => ({ ...e, _visible: false }))
	}

	const onSubmit = () => {
		form.submit()
	}

	const onAdd = async data => {
		setLoading(true)
		const { success, message: resMessage } = await (state._status ===
		EEditorStatus.create
			? fetchAddBillboardPost(data)
			: fetchEditBillboardPost({ ...data, id: state.id }))
		setLoading(false)
		if (success) {
			message.success(resMessage)
			getList()
		}
		setState(e => ({ ...e, _visible: false }))
	}

	return {
		onOpen,
		form,
		title,
		state,
		onSubmit,
		onHide,
		onAdd,
		loading,
	}
}
