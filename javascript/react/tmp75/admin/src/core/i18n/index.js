import { createI18n } from '@/lib/@jsl/src/js/react/lib/i18n'
import { zh_TW } from '@/core/i18n/zh_TW'
import { zh_CN } from '@/core/i18n/zh_CN'

export const {
	t,
	Provider: I18nProvider,
	inject: useI18n,
} = createI18n({
	locale: 'zh_TW',
	messages: {
		zh_TW,
		zh_CN,
	},
})
