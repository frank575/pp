import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { HelloReactNative } from '@/screens/hello-react-native'
import { Home } from '@/screens/home'

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

export const App = () => {
	return (
		<NavigationContainer>
			<Drawer.Navigator initialRouteName="HelloReactNative">
				<Drawer.Screen name="HelloReactNative" component={HelloReactNative} />
				<Drawer.Screen name="Home" component={Home} />
			</Drawer.Navigator>
		</NavigationContainer>
	)
}
// <Stack.Navigator>
// 	<Stack.Screen name="HelloReactNative" component={HelloReactNative} />
// 	<Stack.Screen name="Home" component={Home} />
// </Stack.Navigator>

export default App
