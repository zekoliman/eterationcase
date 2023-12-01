import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigationWrapper from './src/navigations/MainStackNavigator';

function App() {
  return (
    <NavigationContainer>
      <MainNavigationWrapper />
    </NavigationContainer>
  );
}
export default App;
