import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';

type MainStackParams = {
  HomeScreen: undefined;
};

const MainNavigationWrapper: React.FC = () => {
  const MainStack = createNativeStackNavigator<MainStackParams>();
  return (
    <MainStack.Navigator initialRouteName="HomeScreen">
      <MainStack.Screen name="HomeScreen" component={HomeScreen} />
    </MainStack.Navigator>
  );
};

export default MainNavigationWrapper;
