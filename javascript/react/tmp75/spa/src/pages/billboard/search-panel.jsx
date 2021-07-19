import React from 'react'
import { Button, Form, Input, Typography } from 'antd'
import { EEditorStatus } from '@/enums/e-editor-status'
import { useBillboardService } from '@/pages/billboard/service'

export const SearchPanel = () => {
	const { search, onDebounceChangeSearch } = useBillboardService(e => e.list)
	const onOpenEditorDialog = useBillboardService(e => e.editorDialog.onOpen)

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
						defaultValue={search.keyword}
						onChange={ev => onDebounceChangeSearch('keyword', ev.target.value)}
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
