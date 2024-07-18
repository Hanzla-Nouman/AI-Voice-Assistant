// In App.js in a new project

import * as React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from './index';
import Home from './Home';


const Stack = createNativeStackNavigator();

function App() {
  return (<>
  
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Index" component={Index} options={{headerShown:false}} />
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}

export default App;