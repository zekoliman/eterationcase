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
}

const initialState: InitialState = {
  isLoading: false,
  products: null,
  isError: false,
  errorMessage: null,
};

export const getProducts = createAsyncThunk(
  'products',
  async (): Promise<ProductResponse[]> => {
    const res = await fetchProducts();
    return res;
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
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
        products: action.payload,
        isError: false,
        errorMessage: null,
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

export default productsSlice;
