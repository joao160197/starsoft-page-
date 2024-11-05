

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCartFromLocalStorage } from '@/components/Redux/cartSlice';

const LoadCartFromLocalStorage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedItems = localStorage.getItem('cartItems');
    const savedTotalAmount = localStorage.getItem('cartTotalAmount');

    if (savedItems && savedTotalAmount) {
      dispatch(setCartFromLocalStorage({
        items: JSON.parse(savedItems),
        totalAmount: parseFloat(savedTotalAmount),
      }));
    }
  }, [dispatch]);

  return null; 
};

export default LoadCartFromLocalStorage;