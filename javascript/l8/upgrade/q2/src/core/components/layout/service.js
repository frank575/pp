import { createProvider } from '@jsl-react/lib'
import { useState } from 'react'
import { useLocalStorageState } from '@jsl-react/hooks'

const service = () => {
	const [collapse, setCollapse] = useLocalStorageState('l8-q2_collapse', true)
	const [sideKey, setSideKey] = useState(null)

	return {
		setSideKey,
		sideKey,
		collapse,
		setCollapse,
	}
}
export const { Provider: LayoutProvider, inject: useLayout } =
	createProvider(service)
