import { CartProduct } from '@/interfaces';
import { create } from 'zustand';

interface State {
  cart: CartProduct[];

  addProductToCart: (product: CartProduct) => void;
  //   updateπroductQuantity
  // removeProduct
}

export const useCartStore = create<State>()((set, get) => ({
  cart: [],

  //methods
  addProductToCart: (product: CartProduct) => {
    const { cart } = get();

    // Check if the product exists in the size selected
    const productInCart = cart.some(
      (item) => item.id === product.id && item.size === product.size,
    );
    if (!productInCart) {
      set({ cart: [...cart, product] });
      return;
    }

    // If product exists by size
    const updatedCartProducts = cart.map((item) => {
      if (item.id === product.id && item.size === product.size) {
        return { ...item, quantity: item.quantity + product.quantity };
      } else {
        return item; // Return unchanged item for other products
      }
    });

    set({ cart: updatedCartProducts });
  },
}));
