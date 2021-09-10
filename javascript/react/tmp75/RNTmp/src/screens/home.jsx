import React from 'react'
import { Button, Text, View } from 'react-native'

export const Home = ({ navigation }) => {
	return (
		<View>
			<Text>home screen</Text>
			<Button
				title={'Go to hello screen'}
				onPress={() => navigation.navigate('hello')}
			/>
		</View>
	)
}
