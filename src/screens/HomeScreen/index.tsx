import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppSelector} from '../../redux/hooks';
import Colors from '../../theme/Colors';
import {StackScreenProps} from '@react-navigation/stack';
import {MainStackParams} from '../../navigations/MainStackNavigator';
import ProductList from './components/ProductList';

type Props = StackScreenProps<MainStackParams, 'HomeScreen'>;

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {products, isLoading} = useAppSelector(state => state.products);

  return (
    <View style={styles.container}>
      {products && (
        <ProductList
          products={products}
          isLoading={isLoading}
          navigation={navigation}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
export default HomeScreen;
