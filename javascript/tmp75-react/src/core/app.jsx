import ReactDOM from 'react-dom'
import { ConfigProvider } from 'antd'
import zhTW from 'antd/lib/locale/zh_TW'
import '@/core/style/index.css'
import '@/core/lib/dev-log'
import { Routes } from '@/core/components/routes'
import { MittProvider } from 'react-mitt'

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
