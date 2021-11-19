import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'
import { ContentWrapper } from '@/core/components/content-wrapper'

export default () => {
	return (
		<div className="flex items-center justify-center min-w-full min-h-screen bg-gray-200">
			<ContentWrapper>
				<Result
					status="404"
					title="404"
					subTitle={'抱歉，該頁面不存在。'}
					extra={
						<Link to={'/'}>
							<Button type="primary">回首頁</Button>
						</Link>
					}
				/>
			</ContentWrapper>
		</div>
	)
}
