import ReactDOM from 'react-dom'
import { ConfigProvider } from 'antd'
import zhTW from 'antd/lib/locale/zh_TW'
import '@/core/style/index.css'
import '@/core/lib/dev-log'
import { AppVersion } from '@/core/components/version'
import { Routes } from '@/core/components/routes'

export const App = () => {
	return (
		<ConfigProvider locale={zhTW}>
			<Routes />
			<AppVersion />
		</ConfigProvider>
	)
}

ReactDOM.render(
	// <React.StrictMode>
	<App />,
	// </React.StrictMode>,
	document.getElementById('root'),
)
