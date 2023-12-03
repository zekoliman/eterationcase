import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import Colors from '../../theme/Colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../redux/hooks';
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  updateTotalAmount,
} from '../../redux/slices/cartSlice';

const EMPTY_TEXT = 'Your Cart Is Empty';
const CLEAR_CART_TEXT = 'Clear Cart';
const TOTAL_TEXT = 'Total:';
const COMPLETE_BUTTON_TEXT = 'Complete';

const CartScreen: React.FC = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalAmount = useSelector(state => state.cart.totalAmount);

  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const handleDecreaseQuantity = (productId: string) => {
    dispatch(decreaseQuantity(productId));
    dispatch(updateTotalAmount());
  };
  const handleIncreaseQuantity = (productId: string) => {
    dispatch(increaseQuantity(productId));
    dispatch(updateTotalAmount());
  };
  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(updateTotalAmount());
  };
  return (
    <View style={styles.container}>
      <View style={styles.clearCartContainer}>
        {cartItems.length > 0 && (
          <Pressable onPress={handleClearCart}>
            <Text>{CLEAR_CART_TEXT}</Text>
          </Pressable>
        )}
      </View>
      <FlatList
        data={cartItems}
        ListEmptyComponent={<Text style={styles.emptyText}>{EMPTY_TEXT}</Text>}
        renderItem={({item}) => (
          <View style={styles.cartContainer}>
            <View>
              <Text>{item.product.name}</Text>
              <Text style={styles.priceText}>{item.product.price}₺</Text>
            </View>
            <View>
              <View style={styles.productTitleContainer}>
                <Pressable
                  onPress={() => handleDecreaseQuantity(item.product.id)}
                  style={styles.productOperationButton}>
                  <Text style={styles.operatorButtonIcon}>-</Text>
                </Pressable>
                <View style={styles.productCounterContainer}>
                  <Text style={styles.productCounterText}>{item.quantity}</Text>
                </View>
                <Pressable
                  onPress={() => handleIncreaseQuantity(item.product.id)}
                  style={styles.productOperationButton}>
                  <Text style={styles.operatorButtonIcon}>+</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />

      <View
        style={[
          styles.bottomContainer,
          {
            bottom: insets.bottom + 20,
          },
        ]}>
        <View>
          <Text style={styles.totalText}>{TOTAL_TEXT}</Text>
          <Text style={styles.totalAmountText}>{totalAmount}₺</Text>
        </View>
        <View style={styles.productInformationAreaText}>
          <Pressable style={styles.productAddToCartButton}>
            <Text style={styles.addToCartButtonText}>
              {COMPLETE_BUTTON_TEXT}
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
    paddingTop: 18,
    paddingHorizontal: 15,
  },
  totalText: {
    fontSize: 18,
    color: Colors.mainColor,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  totalAmountText: {
    fontWeight: '700',
    fontSize: 18,
  },
  cartContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
  },
  priceText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#2A59FE',
  },
  productTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productOperationButton: {
    backgroundColor: 'rgba(42, 89, 254, 0.3)',
  },
  productCounterText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: 'white',
    fontSize: 18,
  },
  operatorButtonIcon: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  productCounterContainer: {
    backgroundColor: '#2A59FE',
  },
  productInformationAreaText: {
    paddingTop: 15,
  },
  productAddToCartButton: {
    backgroundColor: Colors.mainColor,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 11,
    borderRadius: 4,
  },

  addToCartButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
  clearCartContainer: {
    paddingVertical: 16,
    alignSelf: 'flex-end',
  },
  emptyText: {
    alignSelf: 'center',
  },
});

export default CartScreen;
