import { Redirect } from 'react-router-dom'
import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { useValidateAuth } from '@/core/hooks/use-validate-auth'
import { EAuthCode } from '@/core/hooks/use-auth'
import { PageContent } from '@/components/page-content'
import { RouteContent } from '@/core/components/routes/route-content'

export const AuthComponent = ({ component: RouteComponent }) => {
	const code = useValidateAuth()

	return code === EAuthCode.validating ? (
		<PageContent className="flex items-center">
			<LoadingOutlined className="mr-2" />
			取得使用者資料(身分驗證中)...
		</PageContent>
	) : code === EAuthCode.authError || code === EAuthCode.notLogin ? (
		<Redirect to={'/login'} />
	) : (
		<RouteContent Component={RouteComponent} />
	)
}
