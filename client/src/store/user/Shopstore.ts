import { create } from "zustand";
import { Product } from "../../utils/Type";
import { axiosInstance } from "../../utils/axios";

type ShopStore = {
  isLoading: boolean;
  filteredProduct: Product[];
  fetchFilteredProduct: () => Promise<void>;
  getDetailProduct: (id: string | undefined) => Promise<Product>;
};

export const Shopstore = create<ShopStore>((set) => ({
  isLoading: true,
  filteredProduct: [],
  fetchFilteredProduct: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/shop/products/get`);

      if (res.data.success) {
        set({ isLoading: false });
        set({ filteredProduct: res.data.data });
      }
    } catch (error) {
      set({ isLoading: false });
    }
  },
  getDetailProduct: async (id) => {
    try {
      const res = await axiosInstance.get(`/shop/products/get/${id}`);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  },
}));
