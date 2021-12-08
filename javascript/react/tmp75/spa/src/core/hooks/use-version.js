import { createProvider } from '75l-react'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

const useService = () => {
	const [version, setVersion] = useState(
		`WEB: ${import.meta.env.VITE_APP_VERSION}`,
	)
	// const bootstrap = useCallback(() => {}, [setVersion])
	//
	// useEffect(bootstrap, [])

	return {
		version,
	}
}

export const { Provider: VersionProvider, inject: useVersion } =
	createProvider(useService)
