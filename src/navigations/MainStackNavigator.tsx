import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import HomeBottomWrapper from './HomeBottomNavigator';

export type MainStackParams = {
  SplashScreen: undefined;
  HomeBottomWrapper: undefined;
};

export type NavigationProps = {
  route: RouteProp<ParamListBase> | any;
  navigation: any;
};

const MainNavigationWrapper: React.FC = () => {
  const MainStack = createStackNavigator<MainStackParams>();
  return (
    <MainStack.Navigator initialRouteName="SplashScreen">
      <MainStack.Screen
        options={{
          headerShown: false,
        }}
        name="HomeBottomWrapper"
        component={HomeBottomWrapper}
      />
      <MainStack.Screen
        options={() => ({
          headerShown: false,
        })}
        name="SplashScreen"
        component={SplashScreen}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigationWrapper;
