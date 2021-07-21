import React, { useCallback, useMemo } from 'react'
import { message, Modal, Select, Table, Tag, Tooltip, Typography } from 'antd'
import {
	DeleteOutlined,
	DislikeTwoTone,
	EditOutlined,
	ExclamationCircleOutlined,
	LikeTwoTone,
} from '@ant-design/icons'
import { fetchDeleteBillboardPost } from '@/core/api-service'
import { EBillboardStatus } from '@/core/api-service/_fake-table'
import { EEditorStatus } from '@/enums/e-editor-status'
import { useList } from '@/pages/billboard/service/list'
import { useEditorModal } from '@/pages/billboard/service/editor-modal'

export const DataList = () => {
	const {
		search,
		loading,
		data,
		onChangeSearch,
		onLike,
		getList,
		onChangeTable,
	} = useList(e => e)
	const onOpenEditorDialog = useEditorModal(e => e.onOpen)

	const onDelete = useCallback(
		e => {
			Modal.confirm({
				title: '確認刪除該消息？',
				icon: <ExclamationCircleOutlined />,
				content: (
					<div>
						您將要刪除的消息是<Typography.Text code>{e.name}</Typography.Text>
					</div>
				),
				async onOk() {
					const { success, message: resMessage } =
						await fetchDeleteBillboardPost(e.id)
					if (success) {
						message.success(resMessage)
						getList()
					}
				},
			})
		},
		[getList],
	)

	const columns = useMemo(
		() => [
			{
				title: '編號',
				render(v, e, i) {
					return (search.number - 1) * search.size + (i + 1)
				},
			},
			{
				title: '名稱',
				dataIndex: 'name',
			},
			{
				title: () => {
					return (
						<Select
							placeholder={'篩選狀態'}
							value={search.status}
							allowClear
							onChange={v => onChangeSearch('status', v)}
						>
							<Select.Option value={EBillboardStatus.new}>
								{EBillboardStatus.t(EBillboardStatus.new)}
							</Select.Option>
							<Select.Option value={EBillboardStatus.hot}>
								{EBillboardStatus.t(EBillboardStatus.hot)}
							</Select.Option>
						</Select>
					)
				},
				dataIndex: 'status',
				render(v) {
					return v.map(e =>
						e === EBillboardStatus.normal ? null : (
							<Tag
								key={e}
								color={e === EBillboardStatus.hot ? 'magenta' : 'green'}
							>
								{EBillboardStatus.t(e)}
							</Tag>
						),
					)
				},
			},
			{
				title: '點讚數',
				dataIndex: 'like',
				sorter: true,
			},
			{
				title: '操作',
				render(_, e) {
					const { id, isLike, isDislike } = e
					return (
						<div className={'flex items-center'}>
							<Tooltip title={isLike === true ? '你已按過讚' : '按讚'}>
								<div
									className={'flex items-center cursor-pointer mr-2'}
									onClick={() => onLike(id, 'like', !isLike)}
								>
									<LikeTwoTone
										twoToneColor={isLike === true ? null : '#aaaaaa'}
									/>
									<span className="text-xs ml-1">
										{isLike === true ? '+1' : null}
									</span>
								</div>
							</Tooltip>
							<Tooltip title={isDislike === true ? '你已倒過讚' : '倒讚'}>
								<div
									className={'flex items-center cursor-pointer mr-2'}
									onClick={() => onLike(id, 'dislike', !isDislike)}
								>
									<DislikeTwoTone
										twoToneColor={isDislike === true ? '#eb2f96' : '#aaaaaa'}
									/>
									<span className="text-xs ml-1">
										{isDislike === true ? '+1' : null}
									</span>
								</div>
							</Tooltip>
							<Tooltip title={'編輯'}>
								<EditOutlined
									className={'mr-2'}
									onClick={() => onOpenEditorDialog(EEditorStatus.edit, e)}
								/>
							</Tooltip>
							<Tooltip title={'刪除'}>
								<DeleteOutlined onClick={() => onDelete(e)} />
							</Tooltip>
						</div>
					)
				},
			},
		],
		[search.status, search.number, search.size],
	)

	return (
		<Table
			rowKey={'id'}
			loading={loading}
			dataSource={data.content}
			pagination={{
				total: data.total,
				current: search.number,
				pageSize: search.size,
				showSizeChanger: true,
			}}
			columns={columns}
			onChange={onChangeTable}
		/>
	)
}
