import React from 'react'
import ReactDOM from 'react-dom'
import { MittProvider } from 'react-mitt'
import { ConfigProvider } from 'antd'
import zhTW from 'antd/lib/locale/zh_TW'
import 'antd/dist/antd.css'
import '@/core/style/index.css'
import '@/core/lib/dev-log'
import { Routes } from '@/core/routes'

export const App = () => {
	return (
		<MittProvider>
			<ConfigProvider locale={zhTW}>
				<Routes />
			</ConfigProvider>
		</MittProvider>
	)
}

ReactDOM.render(
	// <React.StrictMode>
	<App />,
	// </React.StrictMode>,
	document.getElementById('root'),
)
