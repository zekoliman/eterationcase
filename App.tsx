import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigationWrapper from './src/navigations/MainStackNavigator';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import CustomLoader from './src/components/CustomLoader';

function App() {
  return (
    <Provider store={store}>
      <CustomLoader />
      <NavigationContainer>
        <MainNavigationWrapper />
      </NavigationContainer>
    </Provider>
  );
}
export default App;
