import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useAppSelector} from '../../redux/hooks';
import Colors from '../../theme/Colors';
import {StackScreenProps} from '@react-navigation/stack';
import {MainStackParams} from '../../navigations/MainStackNavigator';

const FILTERS_TEXT = 'Filters';
const SELECT_FILTER_TEXT = 'Select Filter';
const SEARCH_PLACEHOLDER_TEXT = 'Search';
const EMPTY_PRODUCTS_TEXT = 'Seçilen kriterde ürün bulunamadı';
const ADD_TO_CART_BUTTON_TEXT = 'Add to Cart';
type Props = StackScreenProps<MainStackParams, 'HomeScreen'>;

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {products} = useAppSelector(state => state.products);
  const [searchQuery, setSearchQuery] = useState('');

  const searchArea = () => {
    return (
      <View style={styles.searchBarContainer}>
        <View>
          <TextInput
            placeholder={SEARCH_PLACEHOLDER_TEXT}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
        </View>
        <View style={styles.filterContainer}>
          <Text style={styles.filtersText}>
            {`${FILTERS_TEXT} : ${searchQuery}`}
          </Text>
          <Pressable style={styles.selectFilterButton}>
            <View style={styles.selectFilterContainer}>
              <Text>{SELECT_FILTER_TEXT}</Text>
            </View>
          </Pressable>
        </View>
      </View>
    );
  };

  const filteredProducts = products?.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredProducts}
        ListEmptyComponent={() => <Text>{EMPTY_PRODUCTS_TEXT}</Text>}
        ListHeaderComponent={searchArea()}
        initialNumToRender={12}
        contentContainerStyle={styles.productsContentContainer}
        renderItem={({item}) => (
          <View style={styles.productsContainer}>
            <Pressable
              onPress={() =>
                navigation.navigate('ProductDetail', {
                  products: item,
                })
              }
              style={[styles.shadow, styles.productContent]}>
              <Image source={{uri: item.image}} style={styles.productImage} />
              <View style={styles.productInformationAreaText}>
                <Text style={styles.productPriceText}>{item.price} ₺</Text>
              </View>
              <View style={styles.productInformationAreaText}>
                <Text style={styles.productNameText}>{item.name}</Text>
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
  productsContentContainer: {
    paddingTop: 21,
    gap: 21,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
  searchBarContainer: {
    width: Dimensions.get('screen').width,
    paddingHorizontal: 16,
  },
  searchInput: {
    paddingLeft: 10,
    paddingVertical: 10,
    backgroundColor: 'lightgray',
    borderRadius: 8,
  },
  filterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },
  selectFilterButton: {
    backgroundColor: 'gray',
  },
  filtersText: {
    fontSize: 18,
    fontWeight: '500',
  },
  selectFilterContainer: {
    paddingHorizontal: 31,
    paddingVertical: 10,
  },
});

export default HomeScreen;
