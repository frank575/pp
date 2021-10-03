/// 提供者&供給者
/// v2 - 由 ts 重寫類型
/// v1 - [broken] 移除inject傳入字串的使用方式
/// v0

import React from 'react'
import { createContext, useContextSelector } from 'use-context-selector'

export const createProvider = providerService => {
	const context = createContext(null)
	const Provider = ({ children }) => (
		<context.Provider value={providerService()}>{children}</context.Provider>
	)
	const inject = (getter = () => undefined) =>
		useContextSelector(context, getter)

	return {
		Provider,
		inject,
	}
}
