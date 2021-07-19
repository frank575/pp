/// i18n 可以在任意地方翻譯(t)的國際化
/// v2 {author: frank575} 新增存入緩存的功能
/// v1 {author: frank575} 內部代碼調整
/// v0 {author: frank575}

import { useEffect, useState } from 'react'
import { findNestedDynamicObj } from '../../lib/find-nested-dynamic-obj'
import { useProvider } from '../hooks/use-provider'
import { useSessionStorageState } from '../hooks/storage/use-session-storage-state'
import { useLocalStorageState } from '../hooks/storage/use-local-storage-state'

export { createI18n }

const service =
	({ locale: initialLocale, _setLocale, storageName, storageKey }) =>
	() => {
		const [locale, changeLocale] =
			storageName === 'sessionStorage'
				? useSessionStorageState(storageKey, initialLocale)
				: storageName === 'localStorage'
				? useLocalStorageState(storageKey, initialLocale)
				: useState(initialLocale)

		useEffect(() => {
			_setLocale(locale)
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
 * @param {*} options.locale locale
 * @param {Message} options.messages 翻譯的文字們
 * @param [options.storageName=null: 'localStorage' | 'sessionStorage' | null] 是否要存到緩存裏，有名稱表示要存
 * @param {string} options.storageKey 存到緩存的 key
 */
function createI18n({ locale, messages, storageName, storageKey } = {}) {
	let _locale = locale
	const _setLocale = locale => (_locale = locale)

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

	return {
		t,
		...useProvider(service({ locale, _setLocale, storageName, storageKey })),
	}
}
