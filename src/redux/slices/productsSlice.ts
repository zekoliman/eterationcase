import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchProducts} from '../../services/api/product';
import {
  ErrorMessageTypes,
  ProductResponse,
} from '../../services/types/productType';

interface InitialState {
  isLoading: boolean;
  products: ProductResponse[] | null;
  isError: boolean;
  errorMessage: ErrorMessageTypes | null;
  currentPage: number;
}

const initialState: InitialState = {
  isLoading: false,
  products: null,
  isError: false,
  errorMessage: null,
  currentPage: 1,
};

export const getProducts = createAsyncThunk(
  'products',
  async (_, {getState}): Promise<ProductResponse[]> => {
    const state = getState();
    const pageSize = 12;
    const res = await fetchProducts(state.products.currentPage, pageSize);
    return res;
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    incrementPage: state => {
      state.currentPage += 1;
    },
  },
  extraReducers: builder => {
    builder.addCase(getProducts.pending, state => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        products: state.products
          ? [...state.products, ...action.payload]
          : action.payload,
        isError: false,
        errorMessage: null,
        currentPage: state.currentPage + 1,
      };
    });
    builder.addCase(getProducts.rejected, (state, _) => {
      return {
        ...state,
        isLoading: false,
        products: null,
        isError: true,
        errorMessage: {
          title: 'Hata',
          description: 'Ürünler getirilirken bir hata oluştu.',
        },
      };
    });
  },
});

export const {incrementPage} = productsSlice.actions;

export default productsSlice;
