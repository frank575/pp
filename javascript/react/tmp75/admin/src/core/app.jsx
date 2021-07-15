import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider } from 'antd'
import zhTW from 'antd/lib/locale/zh_TW'
import '@/core/style/index.css'
import '@/core/lib/dev-log'
import { Routes } from '@/core/routes'
import { I18nProvider } from '@i18n'

export const App = () => {
	return (
		<I18nProvider>
			<ConfigProvider locale={zhTW}>
				<Routes />
			</ConfigProvider>
		</I18nProvider>
	)
}

ReactDOM.render(
	// <React.StrictMode>
	<App />,
	// </React.StrictMode>,
	document.getElementById('root'),
)
