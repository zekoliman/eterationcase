import React, {useState} from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../../theme/Colors';
import ProductFilter from './ProductFilter';
import {useAppDispatch} from '../../../redux/hooks';
import {addToCart, updateTotalAmount} from '../../../redux/slices/cartSlice';
import {ProductResponse} from '../../../services/types/productType';
import {getProducts, incrementPage} from '../../../redux/slices/productsSlice';

interface Product {
  name: string;
  image: string;
  price: string;
}

interface ProductListProps {
  products: Product[];
  navigation: any;
  headerComponent?: any;
  isLoading: boolean;
}

const EMPTY_PRODUCTS_TEXT = 'No products found';
const ADD_TO_CART_BUTTON_TEXT = 'Add to Cart';

const ProductList: React.FC<ProductListProps> = ({
  products,
  navigation,
  isLoading,
}) => {
  const dispatch = useAppDispatch();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFilterChange = (item: string, title: string) => {
    if (title === 'Sort By') {
      setSelectedFilters([item]);
      return;
    }
    const isSortBySelected = selectedFilters?.includes('Sort By');
    const updatedFilters = isSortBySelected
      ? [item]
      : selectedFilters?.includes(item)
      ? selectedFilters?.filter(filter => filter !== item)
      : [...(selectedFilters || []), item];

    setSelectedFilters(updatedFilters);
  };

  const handleAddToCart = (product: ProductResponse) => {
    dispatch(addToCart(product));
    dispatch(updateTotalAmount());
    setTimeout(() => {
      navigation.navigate('CartScreen');
    }, 500);
  };

  const handleIncrementPage = () => {
    dispatch(incrementPage());
    dispatch(getProducts());
  };
  return (
    <>
      <ProductFilter
        products={products}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
      <View style={styles.container}>
        <FlatList
          data={products}
          initialNumToRender={12}
          maxToRenderPerBatch={12}
          ListEmptyComponent={<Text>{EMPTY_PRODUCTS_TEXT}</Text>}
          numColumns={2}
          columnWrapperStyle={styles.productsContentContainer}
          onEndReached={handleIncrementPage}
          renderItem={({item}: any) => (
            <View style={styles.productsContainer}>
              <Pressable
                onPress={() =>
                  navigation.navigate('ProductDetail', {products: item})
                }
                style={styles.productContent}>
                <Image source={{uri: item.image}} style={styles.productImage} />
                <View style={styles.productInformationAreaText}>
                  <Text style={styles.productPriceText}>{item.price} ₺</Text>
                </View>
                <View style={styles.productInformationAreaText}>
                  <Text numberOfLines={1} style={styles.productNameText}>
                    {item.name}
                  </Text>
                </View>
                <View style={styles.productInformationAreaText}>
                  <Pressable
                    onPress={() => handleAddToCart(item)}
                    style={styles.productAddToCartButton}>
                    <Text style={styles.addToCartButtonText}>
                      {ADD_TO_CART_BUTTON_TEXT}
                    </Text>
                  </Pressable>
                </View>
              </Pressable>
            </View>
          )}
        />
        {isLoading && (
          <View>
            <ActivityIndicator size={'large'} />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  productsContainer: {
    flex: 1,
  },
  productNameText: {
    fontWeight: '500',
  },
  productContent: {
    padding: 15,
    backgroundColor: 'white',
  },
  productImage: {
    width: 150,
    height: 150,
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
  productPriceText: {
    color: Colors.mainColor,
    fontWeight: '500',
  },
  addToCartButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
  productsContentContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
});

export default ProductList;
