import { useAuth } from '@/core/hooks/useAuth'
import { Redirect, Route } from 'react-router'
import { MyAppContent } from '@/components/my-app-content'
import { LoadingOutlined } from '@ant-design/icons'

export const PrivateRoute = props => {
	const [loading, success] = useAuth()
	return loading ? (
		<MyAppContent className="flex items-center">
			<LoadingOutlined className="mr-2" />
			取得使用者資料(身分驗證中)...
		</MyAppContent>
	) : success ? (
		<Route {...props} />
	) : (
		<Redirect to={'/login'} />
	)
}
