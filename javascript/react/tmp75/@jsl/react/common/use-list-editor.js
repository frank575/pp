/// 新增刪除編輯列表用鉤子
/// v0 {author: frank575}

import { Dispatch, SetStateAction, useCallback, useState } from 'react'

/**
 * @type {<T extends Object, K extends keyof T>(initialValueFunc: () => T, init: boolean = true) => [
 * 		T[],
 * 		Dispatch<SetStateAction<T[]>>,
 * 		action: {
 * 		 create: () => void,
 * 		 editByIndex: (index: number, value: T) => void,
 * 		 editKeyValueByIndex: (index: number, key: K, value: T[K]) => void,
 * 		 removeByIndex: (index: number, removeNum: number = 1) => void,
 * 		 removeByKeyValue: (key: K, value: T[K]) => void,
 * 		}
 * 	]}
 */
export const useListEditor = (initialValueFunc, init = true) => {
	const [list, setList] = useState(() => (init ? [initialValueFunc()] : []))

	const create = useCallback(
		() => setList(e => [...e, initialValueFunc()]),
		[setList],
	)

	const editByIndex = useCallback(
		(index, value) =>
			setList(e => {
				if (index < 0 || index > e.length - 1) return e
				const e2 = e.slice()
				e2[index] = value
				return e2
			}),
		[setList],
	)

	const editKeyValueByIndex = useCallback(
		(index, key, value) =>
			setList(e => {
				if (index < 0 || index > e.length - 1) return e
				const e2 = e.slice()
				e2[index][key] = value
				return e2
			}),
		[setList],
	)

	const removeByIndex = useCallback(
		(index, removeNum = 1) =>
			setList(e => {
				if (index < 0 || index > e.length - 1) return e
				const e2 = e.slice()
				e2.splice(index, removeNum)
				return e2
			}),
		[setList],
	)

	const removeByKeyValue = useCallback(
		(key, value, removeNum = 1) =>
			setList(e => {
				const removeIndex = e.findIndex(f => f[key] === value)
				if (removeIndex === -1) return e
				const e2 = e.slice()
				e2.splice(removeIndex, removeNum)
				return e2
			}),
		[setList],
	)

	return [
		list,
		setList,
		{
			create,
			editByIndex,
			editKeyValueByIndex,
			removeByIndex,
			removeByKeyValue,
		},
	]
}
