/// 提供者&供給者
/// author frank575
/// v1 [broken] 移除inject傳入字串的使用方式
/// v0

import { createContext, useContextSelector } from 'use-context-selector'

/**
 * @template T, S
 * @param {function(): S} providerService
 * @return {{inject: (function(callback: function(state: S): T): T), Provider: function({children: *}): *}}
 */
export const useProvider = providerService => {
	const Context = createContext(null)
	const Provider = ({ children }) => (
		<Context.Provider value={providerService()}>{children}</Context.Provider>
	)
	const inject = (getter = () => undefined) =>
		useContextSelector(Context, getter)

	return {
		Provider,
		inject,
	}
}
