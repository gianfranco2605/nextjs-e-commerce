import { CartProduct } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;

  addProductToCart: (product: CartProduct) => void;
  //   updateπroductQuantity
  // removeProduct
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      //methods
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      //methods
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();
        // console.log(cart);

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
    }),
    { name: 'shopping-cart' },
  ),
);
