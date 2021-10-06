import { NoLayoutWrap } from '@/components/no-layout-wrap'
import { Result, Spin } from 'antd'

export const NoLayoutFallback = () => {
	return (
		<NoLayoutWrap noTitle>
			<Result icon={<Spin size="large" />} title={'頁面加載中...'} />
		</NoLayoutWrap>
	)
}
