import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '@/utils/types/cartItem';

interface CartState {
  items: CartItem[];
  totalAmount: number;
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
    addItem(state, action: PayloadAction<CartItem>) {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalAmount += action.payload.price;

      localStorage.setItem('cartItems', JSON.stringify(state.items));
      localStorage.setItem('cartTotalAmount', JSON.stringify(state.totalAmount));
    },
    removeItem(state, action: PayloadAction<{ id: string }>) {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);

      if (itemIndex >= 0) {
        const item = state.items[itemIndex];

        if (item.quantity > 1) {
          item.quantity -= 1;
          state.totalAmount -= item.price;
        } else {
          state.totalAmount -= item.price;
          state.items.splice(itemIndex, 1);
        }
      }

      localStorage.setItem('cartItems', JSON.stringify(state.items));
      localStorage.setItem('cartTotalAmount', JSON.stringify(state.totalAmount));

      if (state.items.length === 0) {
        cartSlice.caseReducers.resetCartItemStatus(state);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;

      localStorage.removeItem('cartItems');
      localStorage.removeItem('cartTotalAmount');
      cartSlice.caseReducers.resetCartItemStatus(state);
    },
    setCartFromLocalStorage(state, action: PayloadAction<Omit<CartState, 'isOpen'>>) {
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
      state.isOpen = false;
    },
    resetCartItemStatus(state) {
      state.items.forEach(item => {
        item.quantity = 0; 
      });
    },
  },
});

export const { toggleCart, addItem, removeItem, clearCart, setCartFromLocalStorage, resetCartItemStatus } = cartSlice.actions;
export default cartSlice.reducer;
