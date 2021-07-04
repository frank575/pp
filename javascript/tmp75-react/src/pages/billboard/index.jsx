import { useBillboardService } from '@/pages/billboard/use-billboard-service'
import { MyAppContent } from '@/components/my-app-content'
import {
	Button,
	Form,
	Input,
	Select,
	Table,
	Tag,
	Tooltip,
	Typography,
} from 'antd'
import { EBillboardStatus } from '@/core/api-service/_fake-table'
import {
	DeleteOutlined,
	DislikeTwoTone,
	EditOutlined,
	LikeTwoTone,
	OrderedListOutlined,
} from '@ant-design/icons'
import { useMemo } from 'react'
import { MyTitle } from '@/components/my-title'

const { Option } = Select
const { Paragraph, Text } = Typography

export default () => {
	const billboardService = useBillboardService()
	const columns = useMemo(
		() => [
			{
				title: '編號',
				render(v, e, i) {
					return (
						(billboardService.search.number - 1) *
							billboardService.search.size +
						(i + 1)
					)
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
							value={billboardService.search.status}
							allowClear
							onChange={v => billboardService.onChangeSearch('status', v)}
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
									onClick={() => billboardService.onLike(id, 'like', !isLike)}
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
									onClick={() =>
										billboardService.onLike(id, 'dislike', !isDislike)
									}
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
								<EditOutlined className={'mr-2'} />
							</Tooltip>
							<Tooltip title={'刪除'}>
								<DeleteOutlined onClick={() => billboardService.onDelete(id)} />
							</Tooltip>
						</div>
					)
				},
			},
		],
		[
			billboardService.search.status,
			billboardService.search.number,
			billboardService.search.size,
		],
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
							onChange={ev =>
								billboardService.onDebounceChangeSearch(
									'keyword',
									ev.target.value,
								)
							}
						/>
					</Form.Item>
					<Button type={'primary'}>新增消息</Button>
				</div>
			</div>
			<Table
				rowKey={'id'}
				loading={billboardService.loading}
				dataSource={billboardService.data.content}
				pagination={{
					total: billboardService.data.total,
					current: billboardService.search.number,
					pageSize: billboardService.search.size,
					showSizeChanger: true,
				}}
				columns={columns}
				onChange={billboardService.onChangeTable}
			/>
		</MyAppContent>
	)
}
