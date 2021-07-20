import { Redirect } from 'react-router'
import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { useAsyncValidateAuth } from '@/core/hooks/use-async-validate-auth'
import { EAuthCode } from '@/core/hooks/use-auth'
import { AppContent } from '@/components/app/content'

export const AuthComponent = ({ component: RouteComponent }) => {
	const code = useAsyncValidateAuth()

	return code === EAuthCode.validating ? (
		<AppContent className="flex items-center">
			<LoadingOutlined className="mr-2" />
			取得使用者資料(身分驗證中)...
		</AppContent>
	) : code === EAuthCode.authError || code === EAuthCode.notLogin ? (
		<Redirect to={'/login'} />
	) : (
		<RouteComponent />
	)
}
