import ReactDOM from 'react-dom'
import '@/core/style/index.css'
import { Routes } from '@/core/routes'
import { StoreProvider } from '@/core/store'
import '@/core/lib/dev-log'
import { AppVersion } from '@/core/components/version'
import { HashRouter } from 'react-router-dom'

export const App = () => {
	return (
		<>
			<HashRouter>
				<StoreProvider>
					<Routes />
				</StoreProvider>
			</HashRouter>
			<AppVersion />
		</>
	)
}

ReactDOM.render(
	// <React.StrictMode>
	<App />,
	// </React.StrictMode>,
	document.getElementById('root'),
)
