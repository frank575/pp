/// <reference path="../../type.d.ts" />
import { createI18n } from '../common/create-i18n'
import { createMitt } from '../common/create-mitt'
import { createProvider } from '../common/create-provider'
import { useCacheState } from '../common/use-cache-state'
import { useDebounce } from '../common/use-debounce'
import { useDebounceFunc } from '../common/use-debounce-func'
import { useMethods } from '../common/use-methods'
import { useSafeState } from '../common/use-safe-state'
import { useInitialRef } from '../common/use-initial-ref'
import { useToggle } from '../common/use-toggle'
import { useEditorList } from '../common/use-editor-list'
import { useCheckInjectReturn } from '../common/use-check-inject-return'
import { createBreakpoints } from './create-breakpoints'
import { useQueryString } from './use-query-string'
import { useTitle } from './use-title'
import { useLocalStorageState } from './storage/use-local-storage-state'
import { useSessionStorageState } from './storage/use-session-storage-state'

export {
	useLocalStorageState,
	useSessionStorageState,
	createBreakpoints,
	useQueryString,
	useTitle,
	// common
	createI18n,
	createMitt,
	createProvider,
	useCacheState,
	useDebounce,
	useDebounceFunc,
	useMethods,
	useSafeState,
	useInitialRef,
	useToggle,
	useEditorList,
	useCheckInjectReturn,
}
