import { create } from "zustand";
import { NewProduct, Product } from "../../utils/Type";
import { axiosInstance } from "../../utils/axios";

export interface MutationVariables {
  values: NewProduct;
  productId?: string;
}

type Productstore = {
  Addproduct: (
    formData: NewProduct
  ) => Promise<{ success: boolean } | undefined>;
  fetchAllProduct: () => Promise<Product[]>;
  deleteProduct: (id: string) => Promise<void>;
  editProduct: ({
    values,
    productId,
  }: MutationVariables) => Promise<{ success: boolean } | undefined>;
};

export const Productstore = create<Productstore>(() => ({
  Addproduct: async (formData) => {
    try {
      const res = await axiosInstance.post("/admin/products/add", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      if (res.data.success) {
        return { success: true };
      }
    } catch (error) {
      console.log(error);
    }
  },
  fetchAllProduct: async () => {
    try {
      const res = await axiosInstance.get("/admin/products/get");
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  deleteProduct: async (id) => {
    try {
      const res = await axiosInstance.delete(`/admin/products/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },
  editProduct: async ({ values, productId }) => {
    try {
      const res = await axiosInstance.put(
        `/admin/products/edit/${productId}`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      return { success: true };
    } catch (error) {
      console.log(error);
    }
  },
}));
