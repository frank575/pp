import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { HttpProvider } from '@/core/hooks/http/use-http'
import { Routes } from '@/core/routes'

export const App = () => {
	return (
		<NavigationContainer>
			<HttpProvider>
				{/*<AuthProvider>*/}
				{/*	<AuthHttpProvider>*/}
				<Routes />
				{/*</AuthHttpProvider>*/}
				{/*</AuthProvider>*/}
			</HttpProvider>
		</NavigationContainer>
	)
}
// <Stack.Navigator>
// 	<Stack.Screen name="HelloReactNative" component={HelloReactNative} />
// 	<Stack.Screen name="Home" component={Home} />
// </Stack.Navigator>

export default App
