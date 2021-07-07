import { MyAppContent } from '@/components/my-app-content'
import { LoadingOutlined } from '@ant-design/icons'

export const LayoutFallback = () => {
	return (
		<MyAppContent className="flex items-center">
			<LoadingOutlined className="mr-2" />
			正在為您努力加載頁面...
		</MyAppContent>
	)
}
