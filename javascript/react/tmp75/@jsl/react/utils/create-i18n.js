/// create-i18n 可以在任意地方翻譯(t)的國際化
/// v1 {author: frank575} useHook 提供 t 函數
/// v0 {author: frank575}

import { useCallback, useEffect, useState } from 'react'
import { createProvider } from './create-provider'
import { findNestedDynamicObj } from '../../common/utils/find-nested-dynamic-obj'
import { useLocalStorageState } from '../web/storage/use-local-storage-state'
import { useSessionStorageState } from '../web/storage/use-session-storage-state'

export { createI18n }

const translate = (messages, nestedKey, replaceArrayStr = []) => {
	let v = findNestedDynamicObj(messages, nestedKey)
	if (v == null) return nestedKey
	if (typeof v !== 'object') {
		replaceArrayStr.forEach((e, i) => {
			v = v.replace(new RegExp(`\\{${i}\\}`, 'g'), e)
		})
	}
	return v
}

const service =
	({
		messages,
		locale: initialLocale,
		_setLocale,
		storageName,
		storageKey,
		t: _t,
	}) =>
	() => {
		const [locale, changeLocale] =
			storageName === 'sessionStorage'
				? useSessionStorageState(storageKey, initialLocale)
				: storageName === 'localStorage'
				? useLocalStorageState(storageKey, initialLocale)
				: useState(initialLocale)

		/**
		 * @param {string} nestedKey 標題
		 * @param [replaceArrayStr=[]: string[]] 覆蓋的索引內容
		 * @return {string} 翻譯結果
		 */
		const t = useCallback(
			(nestedKey, replaceArrayStr = []) =>
				translate(messages[locale], nestedKey, replaceArrayStr),
			[locale],
		)

		useEffect(() => {
			_setLocale(locale)
		}, [locale])

		return {
			locale,
			changeLocale,
			t,
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
	const t = (nestedKey, replaceArrayStr = []) =>
		translate(messages[_locale], nestedKey, replaceArrayStr)

	return {
		t,
		...createProvider(
			service({ locale, messages, _setLocale, storageName, storageKey }),
		),
	}
}
