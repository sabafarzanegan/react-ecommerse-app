import { create } from "zustand";
import { axiosInstance } from "../../utils/axios";
import { useInvalidateCart } from "../../components/hook/queries/UseCart";

export type Cart = {
  productId: string;
  image: string;
  title: string;
  price: number;
  salePrice: number;
  quantity: number;
};
interface ShopCart {
  isLoading: { [key: string]: boolean };
  Cart: Cart[];
  addToCart: ({
    userId,
    productId,
    quantity,
  }: {
    userId: string | undefined;
    productId: string | undefined;
    quantity: number;
  }) => Promise<void>;
  fetchToCart: (userId: string | undefined) => Promise<void>;
  updateCart: ({
    userId,
    productId,
    quantity,
  }: {
    userId: string | undefined;
    productId: string | undefined;
    quantity: number;
  }) => Promise<void>;
}

export const ShopCart = create<ShopCart>((set) => ({
  isLoading: {},
  Cart: [],
  addToCart: async ({ userId, productId, quantity }) => {
    set((state) => ({
      isLoading: { ...state.isLoading, [productId as string]: true },
    }));
    try {
      const res = await axiosInstance.post("/shop/cart/add", {
        userId,
        productId,
        quantity,
      });

      set((state) => ({
        isLoading: { ...state.isLoading, [productId as string]: false },
        Cart: state.Cart.some((item) => item.productId === productId)
          ? state.Cart.map((item) =>
              item.productId === productId ? { ...item, quantity } : item
            )
          : [...state.Cart, { productId, quantity, ...res.data.product }],
      }));
      useInvalidateCart();
    } catch (error) {
      console.log(error);
      set((state) => ({
        isLoading: { ...state.isLoading, [productId as string]: false },
      }));
    }
  },
  fetchToCart: async (userId) => {
    try {
      const res = await axiosInstance.get(`/shop/cart/get/${userId}`);
      set({ Cart: res.data.data.items });
    } catch (error) {
      console.log(error);
    }
  },
  updateCart: async ({ userId, productId, quantity }) => {
    try {
      if (quantity === 0) {
        const res = await axiosInstance.delete(
          `/shop/cart/${userId}/${productId}`
        );
        set((state) => ({
          Cart: state.Cart.filter((item) => item.productId !== productId),
        }));
      } else {
        const res = await axiosInstance.put("/shop/cart/update-cart", {
          userId,
          productId,
          quantity,
        });
        set((state) => ({
          Cart: state.Cart.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        }));
        useInvalidateCart();

        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
