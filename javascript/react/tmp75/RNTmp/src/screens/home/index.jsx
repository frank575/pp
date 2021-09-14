import React from 'react'
import { Button, Text, View } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { useNavigation } from '@react-navigation/native'

export const Home = () => {
	const navigation = useNavigation()

	return (
		<View style={tw`flex-1 items-center justify-center`}>
			<Text style={tw`font-bold text-2xl mb-2`}>Home Screen</Text>
			<Button
				title={'Go to HelloReactNative screen'}
				onPress={() => navigation.navigate('HelloReactNative')}
			/>
		</View>
	)
}
