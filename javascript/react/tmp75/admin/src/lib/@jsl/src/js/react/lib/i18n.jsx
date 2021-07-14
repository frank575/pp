/// i18n 可以在任意地方翻譯(t)的國際化
/// v0 {author: frank575}

import { useEffect, useState } from 'react'
import { useProvider } from '../hooks/use-provider'
import { findNestedDynamicObj } from '@/lib/@jsl/src/js/lib/find-nested-dynamic-obj'

const service =
	({ locale: initialLocale, _updateLocale }) =>
	() => {
		const [locale, changeLocale] = useState(initialLocale)

		useEffect(() => {
			_updateLocale(locale)
		}, [locale])

		return {
			locale,
			changeLocale,
		}
	}

/**
 * @typedef {Object.<string, string | Message>} Message
 */

/**
 * @template T
 * @param options 選項
 * @param {string} options.locale locale
 * @param {Message} options.messages 翻譯的文字們
 */
export const createI18n = ({ locale, messages } = {}) => {
	let _locale = locale
	const _updateLocale = locale => (_locale = locale)

	/**
	 * @param {string} nestedKey 標題
	 * @param [replaceArrayStr=[]: string[]] 覆蓋的索引內容
	 * @return {string} 翻譯結果
	 */
	const t = (nestedKey, replaceArrayStr = []) => {
		const localeMessages = messages[_locale]
		let v = findNestedDynamicObj(localeMessages, nestedKey)
		if (v == null) return nestedKey
		if (typeof v !== 'object') {
			replaceArrayStr.forEach((e, i) => {
				v = v.replace(new RegExp(`\\{${i}\\}`, 'g'), e)
			})
		}
		return v
	}

	return { t, ...useProvider(service({ locale, _updateLocale })) }
}
