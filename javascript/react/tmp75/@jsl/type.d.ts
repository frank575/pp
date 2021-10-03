type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ...0[]]

type Next = [1, 2, 3, 4, 5, 6, 7, 8, 9, ...10[]]

type Join<K, P> = K extends string | number
	? P extends string | number
		? `${K}${'' extends P ? '' : '.'}${P}`
		: never
	: never

type Paths<T, D extends number = 10> = [D] extends [never]
	? never
	: T extends object
	? {
			[K in keyof T]-?: K extends string | number
				? `${K}` | (Paths<T[K], Prev[D]> extends infer R ? Join<K, R> : never)
				: never
	  }[keyof T]
	: ''

type Leaves<T, D extends number = 10> = [D] extends [never]
	? never
	: T extends object
	? { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T]
	: ''

type Cons<H, T> = T extends readonly any[]
	? ((h: H, ...t: T) => void) extends (...r: infer R) => void
		? R
		: never
	: never

type PathArray<T, D extends number = 10> = [D] extends [never]
	? never
	: T extends object
	? {
			[K in keyof T]-?:
				| [K]
				| (Paths<T[K], Prev[D]> extends infer P
						? P extends []
							? never
							: Cons<K, P>
						: never)
	  }[keyof T]
	: []

type LeaveArray<T, D extends number = 10> = [D] extends [never]
	? never
	: T extends object
	? { [K in keyof T]-?: Cons<K, Leaves<T[K], Prev[D]>> }[keyof T]
	: []

type Split<S extends string, D extends string> = string extends S
	? string[]
	: S extends ''
	? []
	: S extends `${infer T}${D}${infer U}`
	? [T, ...Split<U, D>]
	: [S]

type DeepValue<
	T extends object,
	KS extends (string | number)[],
	KSL extends number = KS['length'],
	D extends number = 0,
> = KSL extends 0
	? undefined
	: KSL extends Next[D]
	? KS[D] extends keyof T
		? T[KS[D]]
		: string | number
	: DeepValue<T, KS>

type ValueOf<T> = T[keyof T]

declare module '75l' {
	import { Moment } from 'moment'

	export function findNestedDynamicObj<
		T extends object,
		K extends Join<Paths<T, 5>, ''>,
		KS extends Split<K, '.'>,
	>(obj: T, key: K): DeepValue<T, KS>

	export function stepPrice(price: string | number, step?: number): string

	export function generateId(length?: number): string

	type EnumValue = boolean | string | number
	type CreateEnumObject = {
		[key: string]: EnumValue | EnumValue[]
	}
	type EnumValues<T> = ValueOf<{
		[K in keyof T]: T[K]
	}>
	type KeyValueEnumObject<T> = {
		[K in keyof T]: T[K] extends object
			? T[K] extends any[]
				? T[K][1]
				: T[K]
			: T[K]
	}

	export function createEnum<
		T extends CreateEnumObject,
		T2 extends KeyValueEnumObject<T>,
	>(
		obj: T,
	): T2 & {
		t: (val: EnumValues<T2>) => EnumValue
		key: (val: EnumValues<T2>) => string
		keys: keyof T2
		map: (
			callback: (value: EnumValue, key: string, index: number) => void,
		) => void | keyof T2
		reduce: <T>(
			callback: (
				previousValue: T,
				value: EnumValue,
				key: string,
				index: number,
			) => void,
			initialValue: T,
		) => T
	}

	export namespace mtime {
		export function today(): [Moment, Moment]

		export function yesterday(): [Moment, Moment]

		export function thisWeek(): [Moment, Moment]

		export function pastWeek(): [Moment, Moment]

		export function thisMonth(): [Moment, Moment]

		export function pastMonth(): [Moment, Moment]
	}

	export function toSimple(text: string): string

	export function toTraditional(text: string): string

	export function checkSameChinese(text1: string, text2: string): boolean

	export function checkIncludeText(text1: string, keyword: string): boolean

	export function interval(): {
		start: (callback: () => void, delay?: number) => void
		stop: () => void
	}

	export function timeout(): {
		start: (callback: () => void, delay?: number) => void
		startSync: (callback: Promise<void>, delay?: number) => void
		stop: () => void
	}

	export function aniFrame(): {
		start: (callback: () => void) => void
		stop: () => void
	}

	export function checkMobile(): boolean

	export function copyText(value: number | string): string

	export function createClassName(
		obj: { [key: string]: boolean },
		...classNames: string[]
	): string

	export function downloadBlob(
		blob: any,
		fileName: string,
		fileType: string,
	): void

	export function insertBefore(
		newNode: HTMLElement,
		existingNode: HTMLElement,
	): void

	export function insertAfter(
		newNode: HTMLElement,
		existingNode: HTMLElement,
	): void
}

declare module '75l-react' {
	import {
		Dispatch,
		MutableRefObject,
		ReactElement,
		SetStateAction,
	} from 'react'

	export function useSafeState<T>(
		initialState: T | (() => T),
	): [T, Dispatch<SetStateAction<T>>]

	export function useTitle(title: string, restoreOnUnmount?: boolean): string

	export function useQueryString<T extends object>(
		initialState: T,
	): [T, Dispatch<SetStateAction<T>>]

	export function createBreakpoints<T extends object, K extends keyof T>(
		screens: T,
	): {
		useBreakpoints: (
			range: K | number,
			callback: (is: boolean) => void,
			opts?: { boostrap?: boolean; delay?: number },
		) => void
	}

	export function useLocalStorageState<T>(
		key: string,
		initialValue: T,
	): [T, Dispatch<SetStateAction<T>>]

	export function useSessionStorageState<T>(
		key: string,
		initialValue: T,
	): [T, Dispatch<SetStateAction<T>>]

	export function useToggle<T>(
		initialState: T | (() => T),
	): [T, () => void, Dispatch<SetStateAction<T>>]

	// TODO 該類型應該是錯的，這 hook 沒啥用，先寫著放著
	export function useMethods<
		T,
		U extends { [funName: string]: (state: T, ...args: any) => T },
	>(initialValue: T, methods: U): { [key in keyof T]: (...args: any) => T }

	export function useListEditor<T extends object, K extends keyof T>(
		initialValueFunc: () => T,
		init?: boolean,
	): [
		T[],
		Dispatch<SetStateAction<T[]>>,
		{
			create: () => void
			editByIndex: (index: number, value: T) => void
			editKeyValueByIndex: (index: number, key: K, value: T[K]) => void
			removeByIndex: (index: number, removeNum?: number) => void
			removeByKeyValue: (key: K, value: T[K]) => void
		},
	]

	export function useCheckInjectReturn<T extends object, K extends keyof T>(
		returnValue: T,
		checkKeys: K[],
	): [
		T,
		{
			current: {
				[P in K]: boolean
			}
		},
	]

	export function useInitialRef<T>(
		initialValue: T | (() => T),
	): MutableRefObject<T>

	// TODO type 沒意外是錯的
	export function useDebounceFunc(
		callback: Function[],
		delay?: number,
	): [(...args: any) => void, () => void]

	export function useDebounce<T>(callback: T, deps: any[], delay?: number): void

	export function useCacheState<T>(
		symbol: Symbol,
		initialValue: T,
	): [T, (arg: T | ((arg: T) => T)) => void]

	type ServiceProvider = (prop: { children: ReactElement }) => ReactElement
	type ServiceInject<T> = <V>(getter: (e: T) => V) => V
	export function createProvider<T>(providerService: () => T): {
		Provider: ServiceProvider
		inject: ServiceInject<T>
	}

	export function createMitt(): {
		useMitt: {
			emit: (type: any, event: any) => void
			on: (type: any, handler: Function) => void
		}
	}

	export function createI18n<
		T extends object,
		K extends keyof T,
		KS extends Join<Paths<T, 5>, ''>,
		i18nT extends (nestedKey: KS, replaceArrayStr?: string[]) => string,
	>(options: {
		locale: K
		messages: T
	}): {
		t: i18nT
		Provider: ServiceProvider
		inject: ServiceInject<{
			locale: string
			changeLocale: Dispatch<SetStateAction<string>>
			t: i18nT
		}>
	}

	export function useAsyncStorageStore<T extends Object, K extends keyof T>(
		appName: string,
		initialStore: T,
	): [T, (key: K, value: T[K]) => void]

	export function useAsyncStorageState<T>(
		key: string,
		initialValue: T,
	): [T, Dispatch<SetStateAction<T>>, () => Promise<void>]
}
