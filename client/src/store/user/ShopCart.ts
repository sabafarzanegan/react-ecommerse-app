import { create } from "zustand";
import { axiosInstance } from "../../utils/axios";

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
  totalAmount: number;
  addToCart: ({
    userId,
    productId,
    quantity,
  }: {
    userId: string | undefined;
    productId: string | undefined;
    quantity: number;
  }) => Promise<void>;
  fetchToCart: (userId: string | undefined) => Promise<Cart[]>;
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
  totalAmount: 0,
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
      }));
      console.log("addToCart", res.data.data);

      set((state) => ({
        isLoading: { ...state.isLoading, [productId as string]: false },
        // Cart: state.Cart.some((item) => item.productId === productId)
        //   ? state.Cart.map((item) =>
        //       item.productId === productId ? { ...item, quantity } : item
        //     )
        //   : [...state.Cart, ...res.data.data],
      }));
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
      console.log("fetchToCart", res.data.data.items);
      return res.data.data.items;
      // set((state) => ({
      //   Cart: [...state.Cart, ...res.data.data.items],
      // }));
    } catch (error) {
      console.log(error);
    }
  },
  updateCart: async ({ userId, productId, quantity }) => {
    try {
      if (quantity === 0) {
        await axiosInstance.delete(`/shop/cart/${userId}/${productId}`);
        set((state) => ({
          Cart: state.Cart.filter((item) => item.productId !== productId),
        }));
      } else {
        await axiosInstance.put("/shop/cart/update-cart", {
          userId,
          productId,
          quantity,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
