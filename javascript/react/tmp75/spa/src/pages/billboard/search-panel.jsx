import React from 'react'
import { Button, Form, Input, Typography } from 'antd'
import { EEditorStatus } from '@/enums/e-editor-status'
import { useEditorModal } from '@/pages/billboard/service/editor-modal'
import { useList } from '@/pages/billboard/service/list'

export const SearchPanel = () => {
	const queryString = useList(e => e.queryString)
	const onChangeKeyword = useList(e => e.onChangeKeyword)
	const onOpenEditorDialog = useEditorModal(e => e.onOpen)

	return (
		<div className="flex items-center justify-between mb-4">
			<Typography.Paragraph style={{ marginBottom: 0 }}>
				最<Typography.Text code>帥</Typography.Text>的一個示範頁面
			</Typography.Paragraph>
			<div className="flex items-center justify-end">
				<Form.Item label={'搜尋'} className={'mr-2 mb-0'}>
					<Input
						className={'w-auto'}
						placeholder={'請輸入名稱(模糊查詢)'}
						allowClear
						defaultValue={queryString.keyword}
						onChange={ev => onChangeKeyword('keyword', ev.target.value)}
					/>
				</Form.Item>
				<Button
					type={'primary'}
					onClick={() => onOpenEditorDialog(EEditorStatus.create)}
				>
					新增消息
				</Button>
			</div>
		</div>
	)
}
