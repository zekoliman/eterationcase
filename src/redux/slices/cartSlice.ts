import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {ProductResponse} from '../../services/types/productType';

interface CartItem {
  product: ProductResponse;
  quantity: number;
}

interface InitialState {
  cartItems: CartItem[];
  totalAmount: number;
}

const initialState: InitialState = {
  cartItems: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductResponse>) => {
      const existingItem = state.cartItems.find(
        item => item.product.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({product: action.payload, quantity: 1});
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        item => item.product.id !== action.payload,
      );
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find(
        item => item.product.id === action.payload,
      );
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find(
        item => item.product.id === action.payload,
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          cartItem => cartItem.product.id !== action.payload,
        );
      }
    },
    clearCart: state => {
      state.cartItems = [];
    },
    updateTotalAmount: state => {
      state.totalAmount = state.cartItems.reduce((total, item) => {
        const productPrice = Number(item.product.price);
        const quantity = item.quantity;
        const itemTotal = productPrice * quantity;
        return total + itemTotal;
      }, 0);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  updateTotalAmount,
} = cartSlice.actions;

export default cartSlice.reducer;
