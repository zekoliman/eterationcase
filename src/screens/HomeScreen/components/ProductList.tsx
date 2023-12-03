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
  id: string;
  name: string;
  createdAt: string;
  image: string;
  price: string;
  model: string;
  brand: string;
  description: string;
}

interface SelectedFilter {
  category: string;
  data: string | string[];
}

interface ProductListProps {
  products: Product[];
  navigation: any;
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
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilter[]>([]);

  const handleFilterChange = (item: string, title: string) => {
    if (title === 'Sort By') {
      setSelectedFilters(prevFilters => [
        {category: 'sort by', data: item},
        ...prevFilters.filter(filter => filter.category !== 'sort by'),
      ]);
      return;
    }

    setSelectedFilters(prevFilters => {
      const updatedFilters = prevFilters
        .filter(filter => filter.category !== title.toLowerCase())
        .concat({
          category: title.toLowerCase(),
          data: prevFilters
            .find(filter => filter.category === title.toLowerCase())
            ?.data.concat(item) || [item],
        });

      return updatedFilters;
    });
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

  const applyFilters = () => {
    let filteredProducts = [...products];

    selectedFilters.forEach(filter => {
      switch (filter.category) {
        case 'sort by':
          filteredProducts = sortProducts(filteredProducts, filter.data);
          break;
        case 'brand':
          filteredProducts = filterByBrand(filteredProducts, filter.data);
          break;
        case 'model':
          filteredProducts = filterByModel(filteredProducts, filter.data);
          break;
      }
    });

    return filteredProducts;
  };

  const sortProducts = (products: Product[], sortBy: string | string[]) => {
    switch (sortBy) {
      case 'Old to new':
        return [...products].sort(
          (firstProduct, secondProduct) =>
            new Date(firstProduct.createdAt).getTime() -
            new Date(secondProduct.createdAt).getTime(),
        );
      case 'new to old':
        return [...products].sort(
          (firstProduct, secondProduct) =>
            new Date(secondProduct.createdAt).getTime() -
            new Date(firstProduct.createdAt).getTime(),
        );
      case 'Price high to low':
        return [...products].sort(
          (firstProduct, secondProduct) =>
            parseFloat(secondProduct.price) - parseFloat(firstProduct.price),
        );
      case 'Price low to high':
        return [...products].sort(
          (firstProduct, secondProduct) =>
            parseFloat(firstProduct.price) - parseFloat(secondProduct.price),
        );
      default:
        return [...products];
    }
  };

  const filterByBrand = (
    products: Product[],
    selectedBrands: string | string[],
  ) => {
    if (typeof selectedBrands === 'string') {
      return products.filter(product => product.brand === selectedBrands);
    } else {
      return products.filter(product => selectedBrands.includes(product.brand));
    }
  };

  const filterByModel = (
    products: Product[],
    selectedModels: string | string[],
  ) => {
    if (typeof selectedModels === 'string') {
      return products.filter(product => product.model === selectedModels);
    } else {
      return products.filter(product => selectedModels.includes(product.model));
    }
  };

  const handleCleanFilters = () => {
    setSelectedFilters([]);
  };

  const filteredProducts = applyFilters();

  return (
    <>
      <ProductFilter
        products={products}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onCleanFilters={handleCleanFilters}
      />
      <View style={styles.container}>
        <FlatList
          data={filteredProducts}
          initialNumToRender={12}
          maxToRenderPerBatch={12}
          ListEmptyComponent={<Text>{EMPTY_PRODUCTS_TEXT}</Text>}
          numColumns={2}
          columnWrapperStyle={styles.productsContentContainer}
          onEndReached={handleIncrementPage}
          renderItem={({item}: {item: Product}) => (
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
