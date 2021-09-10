/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import {
	Button,
	SafeAreaView,
	ScrollView,
	StatusBar,
	Text,
	useColorScheme,
	View,
} from 'react-native'
import {
	Colors,
	DebugInstructions,
	Header,
	LearnMoreLinks,
	ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'
import tw from 'tailwind-react-native-classnames'

const Section = ({ children, title }): Node => {
	const isDarkMode = useColorScheme() === 'dark'
	return (
		<View style={tw`mt-8 px-6`}>
			<Text
				style={tw.style(
					`text-2xl font-semibold`,
					isDarkMode ? 'text-white' : 'text-black',
				)}
			>
				{title}
			</Text>
			<Text
				style={[
					tw`mt-2 text-lg font-normal`,
					{
						color: isDarkMode ? Colors.light : Colors.dark,
					},
				]}
			>
				{children}
			</Text>
		</View>
	)
}

export const HelloReactNative = ({ navigation }) => {
	const isDarkMode = useColorScheme() === 'dark'

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	}

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={backgroundStyle}
			>
				<Header />
				<Button
					title={'Go to home'}
					onPress={() => navigation.navigate('Home')}
				/>
				<View
					style={{
						backgroundColor: isDarkMode ? Colors.black : Colors.white,
					}}
				>
					<Section title="Step One">
						Edit <Text style={tw`font-bold`}>App.js</Text> to change this screen
						and then come back to see your edits.
					</Section>
					<Section title="See Your Changes">
						<ReloadInstructions />
					</Section>
					<Section title="Debug">
						<DebugInstructions />
					</Section>
					<Section title="Learn More">
						Read the docs to discover what to do next:
					</Section>
					<LearnMoreLinks />
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
