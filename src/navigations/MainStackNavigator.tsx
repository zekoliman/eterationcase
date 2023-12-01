import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CustomTopBar from '../components/CustomTopBar';

type MainStackParams = {
  HomeScreen: undefined;
};

const MainNavigationWrapper: React.FC = () => {
  const MainStack = createStackNavigator<MainStackParams>();
  return (
    <MainStack.Navigator initialRouteName="HomeScreen">
      <MainStack.Screen
        options={() => ({
          title: 'E-Market',
          header: ({navigation, route, options}) => (
            <CustomTopBar
              options={options}
              route={route}
              navigation={navigation}
            />
          ),
        })}
        name="HomeScreen"
        component={HomeScreen}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigationWrapper;
