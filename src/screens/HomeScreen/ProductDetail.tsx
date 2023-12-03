import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Colors from '../../theme/Colors';
import {NavigationProps} from '../../navigations/MainStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {useAppDispatch} from '../../redux/hooks';
import {ProductResponse} from '../../services/types/productType';
import {addToCart, updateTotalAmount} from '../../redux/slices/cartSlice';
import {HomeBottomParams} from '../../navigations/HomeBottomNavigator';

const ADD_TO_CART_BUTTON_TEXT = 'Add to Cart';
const PRICE_INFORMATION_TEXT = 'Price:';

type Props = StackScreenProps<HomeBottomParams, 'ProductDetail'>;

const ProductDetail: React.FC<Props> = (props: NavigationProps) => {
  const {products} = props.route?.params;
  const dispatch = useAppDispatch();
  props.navigation.setOptions({title: products?.name});

  const handleAddToCart = (product: ProductResponse) => {
    dispatch(addToCart(product));
    dispatch(updateTotalAmount());
    setTimeout(() => {
      props.navigation.navigate('CartScreen');
    }, 500);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.productImage}>
          <Image source={{uri: products.image}} style={styles.productImage} />
        </View>
        <View style={styles.productText}>
          <View style={styles.productDescriptionContainer}>
            <Text style={styles.productNameText}>{products.name}</Text>
          </View>
          <View style={styles.productDescriptionContainer}>
            <Text>{products.description}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View style={styles.productText}>
          <Text style={styles.priceInformationText}>
            {PRICE_INFORMATION_TEXT}
          </Text>
          <Text style={styles.priceText}>{products.price} ₺</Text>
        </View>
        <View style={styles.productText}>
          <Pressable
            onPress={() => handleAddToCart(products)}
            style={styles.productAddToCartButton}>
            <Text style={styles.addToCartButtonText}>
              {ADD_TO_CART_BUTTON_TEXT}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  productImage: {
    width: '100%',
    height: 225,
  },
  productAddToCartButton: {
    backgroundColor: Colors.mainColor,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 11,
    borderRadius: 4,
  },
  productText: {
    flex: 1,
  },
  bottomContainer: {
    paddingBottom: 40,
    flexDirection: 'row',
  },
  priceInformationText: {
    color: Colors.mainColor,
    fontSize: 18,
  },
  productNameText: {
    fontSize: 20,
    fontWeight: '700',
  },
  priceText: {
    fontWeight: '700',
    fontSize: 18,
  },
  productDescriptionContainer: {
    paddingTop: 16,
  },
  addToCartButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
});

export default ProductDetail;
