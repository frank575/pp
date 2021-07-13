import {
	BillboardProvider,
	useBillboardService,
} from '@/pages/billboard/service'
import { MyAppContent } from '@/components/my-app-content'
import {
	Button,
	Form,
	Input,
	message,
	Modal,
	Select,
	Table,
	Tag,
	Tooltip,
	Typography,
} from 'antd'
import { EBillboardStatus } from '@/core/api-service/_fake-table'
import {
	ExclamationCircleOutlined,
	DeleteOutlined,
	DislikeTwoTone,
	EditOutlined,
	LikeTwoTone,
	OrderedListOutlined,
} from '@ant-design/icons'
import React, { useCallback, useMemo } from 'react'
import { MyTitle } from '@/components/my-title'
import { fetchDeleteBillboardPost } from '@/core/api-service'
import { EditorModal } from '@/pages/billboard/editor-modal'
import { EEditorStatus } from '@/enums/e-editor-status'

const { Option } = Select
const { Paragraph, Text } = Typography

export default () => {
	return (
		<BillboardProvider>
			<Content />
		</BillboardProvider>
	)
}

const Content = () => {
	const {
		search,
		loading,
		data,
		onChangeSearch,
		onLike,
		getList,
		onDebounceChangeSearch,
		onChangeTable,
	} = useBillboardService(e => e.list)
	const onOpenEditorDialog = useBillboardService(e => e.editorDialog.onOpen)

	const onDelete = useCallback(
		e => {
			Modal.confirm({
				title: '確認刪除該消息？',
				icon: <ExclamationCircleOutlined />,
				content: (
					<div>
						您將要刪除的消息是<Text code>{e.name}</Text>
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
							<Option value={EBillboardStatus.new}>
								{EBillboardStatus.t(EBillboardStatus.new)}
							</Option>
							<Option value={EBillboardStatus.hot}>
								{EBillboardStatus.t(EBillboardStatus.hot)}
							</Option>
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
		<MyAppContent>
			<MyTitle title={'公佈欄'} icon={OrderedListOutlined} just />
			<div className="flex items-center justify-between mb-4">
				<Paragraph style={{ marginBottom: 0 }}>
					最<Text code>帥</Text>的一個示範頁面
				</Paragraph>
				<div className="flex items-center justify-end">
					<Form.Item label={'搜尋'} className={'mr-2 mb-0'}>
						<Input
							className={'w-auto'}
							placeholder={'請輸入名稱(模糊查詢)'}
							allowClear
							defaultValue={search.keyword}
							onChange={ev =>
								onDebounceChangeSearch('keyword', ev.target.value)
							}
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
			<EditorModal />
		</MyAppContent>
	)
}
