import ReactDOM from 'react-dom'
import '@/core/style/index.css'
import '@/core/lib/dev-log'
import { AppVersion } from '@/core/components/version'
import { Routes } from '@/core/components/routes'

export const App = () => {
	return (
		<>
			<Routes />
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
