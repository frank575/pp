/// 提供者&供給者
/// v1 {author: frank575} [broken] 移除inject傳入字串的使用方式
/// v0 {author: frank575}

import React from 'react'
import { createContext, useContextSelector } from 'use-context-selector'

export const useProvider = <A, T>(providerService: (...args: A[]) => T) => {
	const context = createContext<T>(null as unknown as T)
	const Provider = ({ children } = { children: React.Children }) => (
		<context.Provider value={providerService()}>{children}</context.Provider>
	)
	const inject = (getter: (el?: T) => any = () => undefined) =>
		useContextSelector(context, getter)

	return {
		Provider,
		inject,
	}
}
