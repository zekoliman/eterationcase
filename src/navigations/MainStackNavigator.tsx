import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CustomTopBar from '../components/CustomTopBar';
import SplashScreen from '../screens/SplashScreen';
import {ProductResponse} from '../services/types/productType';
import ProductDetail from '../screens/HomeScreen/ProductDetail';

export type MainStackParams = {
  SplashScreen: undefined;
  HomeScreen: undefined;
  ProductDetail: {
    products: ProductResponse;
  };
};

const MainNavigationWrapper: React.FC = () => {
  const MainStack = createStackNavigator<MainStackParams>();
  return (
    <MainStack.Navigator initialRouteName="SplashScreen">
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
      <MainStack.Screen
        options={() => ({
          headerShown: false,
        })}
        name="SplashScreen"
        component={SplashScreen}
      />
      <MainStack.Screen
        options={() => ({
          header: ({navigation, route, options}) => (
            <CustomTopBar
              options={options}
              route={route}
              navigation={navigation}
            />
          ),
        })}
        name="ProductDetail"
        component={ProductDetail}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigationWrapper;
