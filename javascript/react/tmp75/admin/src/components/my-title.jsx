import { Breadcrumb, Typography } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { createClassName } from '@jsl'
import { Link } from 'react-router-dom'

const { Item } = Breadcrumb
export const MyTitle = ({ title, just, icon: Icon, className, children }) => {
	return (
		<Typography>
			<div className="flex items-center mb-2">
				<Typography.Title level={3} style={{ marginBottom: 0 }}>
					{title}
				</Typography.Title>
				<Breadcrumb
					className={createClassName(
						{
							'flex-1 bg-gray-100 px-2 ml-2': true,
						},
						[className],
					)}
				>
					<Item>
						<Link to={'/'}>
							<HomeOutlined className={'inline-flex items-center'} />
						</Link>
					</Item>
					{just ? (
						<Item>
							{Icon ? (
								<Icon className={'inline-flex items-center mr-1'} />
							) : null}
							{title}
						</Item>
					) : (
						children
					)}
				</Breadcrumb>
			</div>
		</Typography>
	)
}
