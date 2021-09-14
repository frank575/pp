/// 提供者&供給者
/// v2 {author: frank575} 由 ts 重寫類型
/// v1 {author: frank575} [broken] 移除inject傳入字串的使用方式
/// v0 {author: frank575}

import React from 'react'
import { createContext, useContextSelector } from 'use-context-selector'

/**
 * @type {
 *   <T>(providerService: () => T) => {
 *     Provider: (prop: {children: React.ReactElement}) => React.ReactElement,
 *     inject: (getter: (e: T) => any) => any
 *   }
 * }
 */
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
