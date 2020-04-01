// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import PasswordTextBox from './components/PasswordTextBox';
// import Constants from 'expo-constants';
import React from 'react';
import { View } from 'react-native';
import LoginPage from './src/components/LoginPage';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//       <PasswordTextBox icon="lock" label="Old Password" onChange={(v) => this.setState('old', v)} />


//     </View>
//   );
// }

// const Stack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
function App() {
  return (
      <LoginPage />
  );
}
export default App;