import zhTW from 'antd/lib/locale/zh_TW'
import { ConfigProvider } from 'antd'

export const RouteContent = ({ Component }) => {
	return (
		<ConfigProvider locale={zhTW}>
			<Component />
		</ConfigProvider>
	)
}
