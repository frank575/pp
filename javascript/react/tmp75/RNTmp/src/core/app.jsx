import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HelloReactNative } from '@/screens/hello-react-native'
import { Home } from '@/screens/home'

const Stack = createNativeStackNavigator()

export const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="HelloReactNative" component={HelloReactNative} />
				<Stack.Screen name="Home" component={Home} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default App
