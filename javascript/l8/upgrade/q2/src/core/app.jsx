import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { AuthProvider } from '@/core/hooks/use-auth'
import { Routes } from '@/core/routes'
import { AuthHttpProvider } from '@/core/hooks/http/use-auth-http'
import { HttpProvider } from '@/core/hooks/http/use-http'
import '@/core/style/index.css'
import '@/core/lib/dev-log'

export const App = () => {
	return (
		<Router>
			<HttpProvider>
				<AuthProvider>
					<AuthHttpProvider>
						<Routes />
					</AuthHttpProvider>
				</AuthProvider>
			</HttpProvider>
		</Router>
	)
}

ReactDOM.render(
	// <React.StrictMode>
	<App />,
	// </React.StrictMode>,
	document.getElementById('root'),
)
