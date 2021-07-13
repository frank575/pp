import React from 'react'
import { Redirect } from 'react-router'
import { EAuthCode } from '@/core/store/use-auth'
import { MyAppContent } from '@/components/my-app-content'
import { LoadingOutlined } from '@ant-design/icons'
import { useAuth } from '@/core/hooks/use-auth'

export const AuthScreen = ({ children }) => {
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
