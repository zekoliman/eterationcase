import React, {useState} from 'react';
import {FlatList, Text, View, Image, Pressable, StyleSheet} from 'react-native';
import Colors from '../../../theme/Colors';
import ProductFilter from './ProductFilter';

interface Product {
  name: string;
  image: string;
  price: string;
}

interface ProductListProps {
  products: Product[];
  navigation: any;
  headerComponent?: any;
}

const EMPTY_PRODUCTS_TEXT = 'No products found';
const ADD_TO_CART_BUTTON_TEXT = 'Add to Cart';

const ProductList: React.FC<ProductListProps> = ({products, navigation}) => {
  const [selectedFilters, setSelectedFilters] = useState('');

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
          contentContainerStyle={styles.productsContentContainer}
          ListEmptyComponent={<Text>{EMPTY_PRODUCTS_TEXT}</Text>}
          renderItem={({item}) => (
            <View style={styles.productsContainer}>
              <Pressable
                onPress={() =>
                  navigation.navigate('ProductDetail', {products: item})
                }
                style={[styles.shadow, styles.productContent]}>
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
                  <Pressable style={styles.productAddToCartButton}>
                    <Text style={styles.addToCartButtonText}>
                      {ADD_TO_CART_BUTTON_TEXT}
                    </Text>
                  </Pressable>
                </View>
              </Pressable>
            </View>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 24.0,
    elevation: 6,
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
    paddingTop: 21,
    gap: 21,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default ProductList;
