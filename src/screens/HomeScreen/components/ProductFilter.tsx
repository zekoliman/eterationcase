import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  Pressable,
} from 'react-native';
import EterationRadioButton from '../../../components/EterationRadioButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import CloseSvg from '../../../assets/icons/CloseSvg';
import {useNavigation} from '@react-navigation/native';

const FILTERS_TEXT = 'Filters';
const SELECT_FILTER_TEXT = 'Select Filter';
const SEARCH_PLACEHOLDER_TEXT = 'Search';

type ProductFilterProps = {
  products: any;
  selectedFilters: any;
  onFilterChange: (item: string, title: string) => void;
};

const ProductFilter: React.FC<ProductFilterProps> = ({
  products,
  selectedFilters,
  onFilterChange,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterData, setFilterData] = useState<any>([]);
  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const navigation = useNavigation();

  const filterModalOptions = () => {
    if (openFilterModal) {
      navigation.setOptions({headerShown: true});
      return setOpenFilterModal(false);
    }
    navigation.setOptions({headerShown: false});
    setOpenFilterModal(true);
  };

  const convertModelData = () => {
    const transformedData: any[] = [
      {
        title: 'Sort By',
        data: [
          'Old to new',
          'new to old',
          'Price high to low',
          'Price low to high',
        ],
      },
      {
        title: 'Brand',
        data: products?.map((item: {brand: string}) => item.brand),
      },
      {
        title: 'Model',
        data: products?.map((item: {model: string}) => item.model),
      },
    ];
    setFilterData(transformedData);
  };

  const searchArea = () => {
    return (
      <View style={styles.searchBarContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            placeholder={SEARCH_PLACEHOLDER_TEXT}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.filterContainer2}>
          <Text
            style={
              styles.filtersText
            }>{`${FILTERS_TEXT} : ${selectedFilters}`}</Text>
          <Pressable
            onPress={filterModalOptions}
            style={styles.selectFilterButton}>
            <View style={styles.selectFilterContainer}>
              <Text>{SELECT_FILTER_TEXT}</Text>
            </View>
          </Pressable>
        </View>
      </View>
    );
  };

  useEffect(() => {
    convertModelData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  return (
    <>
      {searchArea()}
      {openFilterModal && filterData && (
        <SafeAreaView style={styles.filterContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={filterModalOptions}>
              <CloseSvg />
            </TouchableOpacity>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>Filter</Text>
            </View>
          </View>
          <View style={styles.filterContentContainer}>
            <View style={styles.sortSection}>
              <Text style={styles.sortByText}>
                Please first select Sort By category
              </Text>
              <TouchableOpacity>
                <Text style={styles.sortByText}>Clean </Text>
              </TouchableOpacity>
            </View>
            {filterData.map(
              (
                section: {
                  title: string;
                  data: any;
                },
                index: number,
              ) => (
                <View style={styles.filterSection} key={index}>
                  <Text style={styles.filterSectionTitle}>{section.title}</Text>
                  <ScrollView bounces={false} style={styles.filterScrollView}>
                    {section.data.map((item: string, itemIndex: number) => (
                      <TouchableOpacity
                        key={itemIndex}
                        onPress={() => onFilterChange(item, section.title)}
                        style={styles.filterItem}>
                        <EterationRadioButton
                          isSelected={
                            selectedFilters
                              ? selectedFilters.includes(item)
                              : false
                          }
                          containerStyle={styles.radioButtonContainer}
                          buttonText={item}
                        />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              ),
            )}
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: 'white',
    zIndex: 99,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingLeft: 23,
    paddingVertical: 23,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  headerTextContainer: {
    paddingLeft: 127,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '300',
  },
  filterContentContainer: {
    flex: 1,
    paddingTop: 16,
  },
  sortSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  sortByText: {
    alignSelf: 'center',
  },
  filterSection: {
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  filterSectionTitle: {
    fontSize: 12,
    color: '#333333B2',
  },
  filterScrollView: {
    maxHeight: 200,
    paddingHorizontal: 13,
    paddingTop: 21,
  },
  filterItem: {
    paddingBottom: 16,
  },
  radioButtonContainer: {
    marginRight: 20,
  },
  searchBarContainer: {
    paddingHorizontal: 16,
  },
  searchInputContainer: {
    paddingTop: 14,
  },
  searchInput: {
    paddingLeft: 10,
    paddingVertical: 10,
    backgroundColor: 'lightgray',
    borderRadius: 8,
    marginTop: 14,
  },
  filterContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },
  filtersText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
  },
  selectFilterButton: {
    backgroundColor: '#D9D9D9',
  },
  selectFilterContainer: {
    paddingHorizontal: 31,
    paddingVertical: 10,
  },
});

export default ProductFilter;
