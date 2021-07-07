import { useEffect, useMemo, useState } from 'react'
import { Form, message } from 'antd'
import { useBillboardService } from '@/pages/billboard/use-billboard-service'
import { EEditorStatus } from '@/enums/e-editor-status'
import {
	fetchAddBillboardPost,
	fetchEditBillboardPost,
} from '@/core/api-service'
import { useMitt } from 'react-mitt'
import { EMittType } from '@/enums/e-mitt-type'

const initialState = () => ({
	id: undefined, // number | undefined
	name: '',
	_status: EEditorStatus.create,
	_visible: false,
})

export const userEditorDialogService = () => {
	const { emitter } = useMitt()
	const getList = useBillboardService(e => e.getList)
	const [form] = Form.useForm()
	const [loading, setLoading] = useState(false)
	const [state, setState] = useState(initialState())
	const title = useMemo(
		() => `${EEditorStatus.t(state._status)}消息`,
		[state._status],
	)

	useEffect(() => {
		emitter.on(EMittType.billboardEditorDialog, onOpen)
	}, [])

	const onOpen = e => {
		const { status, data } = e
		if (status === EEditorStatus.create) {
			const _data = initialState()
			setState({ ..._data, _status: status, _visible: true })
			form.setFieldsValue(_data)
		} else {
			setState({ ...data, _status: status, _visible: true })
			form.setFieldsValue(data)
		}
	}

	const onClose = () => {
		setState(e => ({ ...e, _visible: false }))
	}

	const onOk = () => {
		form.submit()
	}

	const onFinish = async data => {
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
		form,
		title,
		state,
		onOk,
		onClose,
		onFinish,
		loading,
	}
}
