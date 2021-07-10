import React from 'react'
import { useAuth } from '@/core/hooks/use-auth'
import { Redirect, Route } from 'react-router'
import { MyAppContent } from '@/components/my-app-content'
import { LoadingOutlined } from '@ant-design/icons'
import { EAuthCode } from '@/core/store/use-auth'

const WithPrivateRoute = ({ children }) => {
	const code = useAuth()
	return code === EAuthCode.validating ? (
		<MyAppContent className="flex items-center">
			<LoadingOutlined className="mr-2" />
			取得使用者資料(身分驗證中)...
		</MyAppContent>
	) : code === EAuthCode.authError || code === EAuthCode.notLogin ? (
		<Redirect to={'/login'} />
	) : (
		children
	)
}

export const PrivateRoute = props => {
	return (
		<Route
			{...props}
			component={null}
			render={() => (
				<WithPrivateRoute>
					<props.component />
				</WithPrivateRoute>
			)}
		/>
	)
}
