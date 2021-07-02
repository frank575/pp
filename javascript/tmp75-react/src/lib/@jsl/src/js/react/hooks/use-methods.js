/// 封裝鉤子用方法
/// author frank575
/// v0


import { useMemo, useState } from 'react'

// return U 再想辦法找寫法，目前先這樣
// <S, T extends { [funName: string]: (state: S, ...args) => S }>(initialValue: S, methods: T): { [key in keyof T]: (...args) => S }
/**
 * @template S
 * @template T
 * @param {S} initialValue
 * @param {T} methods
 * @returns {[S, T]}
 */
export const useMethods = (initialValue, methods) => {
	const [state, setState] = useState(initialValue)
	const bindMethods = useMemo(
		() =>
			Object.entries(methods).reduce(
				(p, [name, fn]) => (
					(p[name] = (...args) => setState(state => fn(state, ...args))), p
				),
				{},
			),
		[methods],
	)
	return [state, bindMethods]
}
