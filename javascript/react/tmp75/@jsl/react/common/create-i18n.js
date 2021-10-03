/// create-i18n 可以在任意地方翻譯(t)的國際化
/// v2 - 移除 storage 配置項
/// v1 - useHook 提供 t 函數
/// v0

import { useCallback, useEffect, useState } from 'react'
import { createProvider } from './create-provider'
import { findNestedDynamicObj } from '../../common/common/find-nested-dynamic-obj'

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
	({ messages, locale: initialLocale, _setLocale, t: _t }) =>
	() => {
		const [locale, changeLocale] = useState(initialLocale)

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

function createI18n({ locale, messages } = {}) {
	let _locale = locale
	const _setLocale = locale => (_locale = locale)

	const t = (nestedKey, replaceArrayStr = []) =>
		translate(messages[_locale], nestedKey, replaceArrayStr)

	return {
		t,
		...createProvider(service({ locale, messages, _setLocale })),
	}
}
