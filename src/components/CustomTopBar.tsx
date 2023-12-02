import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import {
  BottomTabNavigationOptions,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import {getHeaderTitle} from '@react-navigation/elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../theme/Colors';
import NavigationLeftSvg from '../assets/icons/LeftArrowSvg';

type NavigationBarTypes = {
  navigation:
    | StackNavigationProp<ParamListBase>
    | BottomTabNavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
  options: StackNavigationOptions | BottomTabNavigationOptions;
};

const CustomTopBar = ({navigation, route, options}: NavigationBarTypes) => {
  const screenTitle = getHeaderTitle(options, route?.name);

  const goBack = () => {
    navigation.goBack();
  };

  const renderHeader = () => {
    return (
      <Text
        numberOfLines={1}
        style={[
          styles.headerTitle,
          {marginHorizontal: navigation.canGoBack() ? 77 : 16},
        ]}>
        {screenTitle}
      </Text>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        {navigation.canGoBack() && (
          <TouchableOpacity
            style={styles.leftIconView}
            activeOpacity={0.75}
            onPress={goBack}>
            <NavigationLeftSvg />
          </TouchableOpacity>
        )}
        {renderHeader()}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.mainColor,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerView: {
    flex: 1,
    justifyContent: 'center',
  },
  headerTitle: {
    fontWeight: '800',
    fontSize: 24,
    color: Colors.white,
  },

  leftIconView: {
    position: 'absolute',
    left: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
export default CustomTopBar;
