import React from 'react'
import { HelloReactNative } from '@/screens/hello-react-native'
import { Home } from '@/screens/home'
import { Login } from '../screens/login'
import { createDrawerNavigator } from '@react-navigation/drawer'

const Drawer = createDrawerNavigator()

export const Routes = () => {
	return (
		<Drawer.Navigator initialRouteName="HelloReactNative">
			<Drawer.Screen name="HelloReactNative" component={HelloReactNative} />
			<Drawer.Screen name="Home" component={Home} />
			<Drawer.Screen name="Login" component={Login} />
		</Drawer.Navigator>
	)
}
