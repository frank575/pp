import { useBillboardService } from '@/pages/billboard/useBillboardService'
import { MyAppContent } from '@/components/my-app-content'
import {
	Form,
	Button,
	Divider,
	Input,
	Select,
	Table,
	Tag,
	Tooltip,
	Typography,
} from 'antd'
import { EBillBoardStatus } from '@/core/api-service/_fake-table'
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
					return i + 1
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
						>
							<Option value={EBillBoardStatus.normal}>
								{EBillBoardStatus.t(EBillBoardStatus.normal)}
							</Option>
							<Option value={EBillBoardStatus.new}>
								{EBillBoardStatus.t(EBillBoardStatus.new)}
							</Option>
							<Option value={EBillBoardStatus.hot}>
								{EBillBoardStatus.t(EBillBoardStatus.hot)}
							</Option>
						</Select>
					)
				},
				dataIndex: 'status',
				render(v) {
					return v.map(e =>
						e === EBillBoardStatus.normal ? null : (
							<Tag
								key={e}
								color={e === EBillBoardStatus.hot ? 'magenta' : 'green'}
							>
								{EBillBoardStatus.t(e)}
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
					const { isLike, isDislike } = e
					return (
						<div className={'flex items-center'}>
							<Tooltip title={isLike ? '你已按過讚' : '按讚'}>
								<div className={'flex items-center cursor-pointer mr-2'}>
									<LikeTwoTone twoToneColor={isLike ? null : '#aaaaaa'} />
									<span className="text-xs ml-1">{isLike ? '+1' : null}</span>
								</div>
							</Tooltip>
							<Tooltip title={isDislike ? '你已倒過讚' : '倒讚'}>
								<div className={'flex items-center cursor-pointer mr-2'}>
									<DislikeTwoTone
										twoToneColor={isDislike ? '#eb2f96' : '#aaaaaa'}
									/>
									<span className="text-xs ml-1">
										{isDislike ? '+1' : null}
									</span>
								</div>
							</Tooltip>
							<Tooltip title={'編輯'}>
								<EditOutlined className={'mr-2'} />
							</Tooltip>
							<Tooltip title={'刪除'}>
								<DeleteOutlined />
							</Tooltip>
						</div>
					)
				},
			},
		],
		[billboardService.search.status],
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
						<Input className={'w-auto'} placeholder={'請輸入名稱(模糊查詢)'} />
					</Form.Item>
					<Button type={'primary'}>新增消息</Button>
				</div>
			</div>
			<Table
				rowKey={'id'}
				loading={billboardService.loading}
				dataSource={billboardService.data}
				pagination={{
					total: billboardService.search.total,
					current: billboardService.search.current,
					pageSize: billboardService.search.size,
				}}
				columns={columns}
			/>
		</MyAppContent>
	)
}
