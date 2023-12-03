import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigationWrapper from './src/navigations/MainStackNavigator';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import CustomLoader from './src/components/CustomLoader';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor} from './src/redux/persistor';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CustomLoader />
        <NavigationContainer>
          <MainNavigationWrapper />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
export default App;
