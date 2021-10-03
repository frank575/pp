import { useI18n } from '@i18n'
import { ConfigProvider } from 'antd'
import { antdLocales } from '@/core/components/routes/antd-locales'

export const RouteContent = ({ Component }) => {
	const locale = useI18n(e => e.locale)

	return (
		<ConfigProvider locale={antdLocales[locale]}>
			<Component />
		</ConfigProvider>
	)
}
