import { useState } from 'react'
import { useProvider } from '../hooks/use-provider'

const service =
	({ locale: initialLocale }) =>
	() => {
		const [locale, changeLocale] = useState(initialLocale)
		return {
			locale,
			changeLocale,
		}
	}

/**
 * @template T extends Object
 * @param options 選項
 * @param {string} options.locale locale
 * @param {T} options.messages 翻譯的文字們
 */
export const createI18n = ({ locale, messages } = {}) => {
	/**
	 * @param {string} nestedKey 標題
	 * @return {string} 翻譯結果
	 */
	const t = nestedKey => {
		return message[locale][nestedKey]
	}
	return { t, ...useProvider(service({ locale })) }
}
