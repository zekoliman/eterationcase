import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import CustomTopBar from '../components/CustomTopBar';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CartScreen from '../screens/CartScreen';
import ProductDetail from '../screens/HomeScreen/ProductDetail';
import HomeSvg from '../assets/icons/HomeIconSvg';
import BasketSvg from '../assets/icons/BasketIconSvg';
import {ProductResponse} from '../services/types/productType';

export type HomeBottomParams = {
  HomeScreen: undefined;
  ProductDetail: {
    products: ProductResponse;
  };
};

export type NavigationProps = {
  route: RouteProp<ParamListBase> | any;
  navigation: any;
};

const HomeBottomWrapper: React.FC = () => {
  const HomeBottom = createBottomTabNavigator();

  return (
    <HomeBottom.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}>
      <HomeBottom.Screen
        options={() => ({
          title: 'E-Market',
          header: ({navigation, route, options}) => (
            <CustomTopBar
              disableGoBack
              options={options}
              route={route}
              navigation={navigation}
            />
          ),
          tabBarIcon: () => <HomeSvg />,
        })}
        name="HomeScreen"
        component={HomeScreen}
      />
      <HomeBottom.Screen
        options={() => ({
          title: 'Your Cart',
          header: ({navigation, route, options}) => (
            <CustomTopBar
              disableGoBack
              options={options}
              route={route}
              navigation={navigation}
            />
          ),
          tabBarIcon: () => <BasketSvg />,
        })}
        name="CartScreen"
        component={CartScreen}
      />
      <HomeBottom.Screen
        options={() => ({
          header: ({navigation, route, options}) => (
            <CustomTopBar
              options={options}
              route={route}
              navigation={navigation}
            />
          ),
          tabBarButton: () => false,
        })}
        name="ProductDetail"
        component={ProductDetail}
      />
    </HomeBottom.Navigator>
  );
};

export default HomeBottomWrapper;
