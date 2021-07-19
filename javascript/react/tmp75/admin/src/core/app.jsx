import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhTW from 'antd/lib/locale/zh_TW'
import { I18nProvider } from '@i18n'
import { AuthProvider } from '@/core/service/use-auth'
import { Routes } from '@/core/routes'
import '@/core/style/index.css'
import '@/core/lib/dev-log'

export const App = () => {
	return (
		<Router>
			<I18nProvider>
				<ConfigProvider locale={zhTW}>
					<AuthProvider>
						<Routes />
					</AuthProvider>
				</ConfigProvider>
			</I18nProvider>
		</Router>
	)
}

ReactDOM.render(
	// <React.StrictMode>
	<App />,
	// </React.StrictMode>,
	document.getElementById('root'),
)
