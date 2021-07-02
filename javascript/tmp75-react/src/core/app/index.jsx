import ReactDOM from 'react-dom'
import '@/core/style/index.css'
import { Routes } from '@/core/app/routes'
import { StoreProvider } from '@/core/store'
import '@/core/app/dev-log'
import { AppVersion } from '@/core/app/components/version'

export const App = () => {
	return (
		<StoreProvider>
			<Routes />
			<AppVersion />
		</StoreProvider>
	)
}

ReactDOM.render(
	// <React.StrictMode>
	<App />,
	// </React.StrictMode>,
	document.getElementById('root'),
)
