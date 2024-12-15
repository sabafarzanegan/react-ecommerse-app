import { create } from "zustand";
import { axiosInstance } from "../../utils/axios";
import { Address, getAddress } from "../../utils/Type";

interface addressListtype {
  userId: string;
  address: string;
  city: string;
  pincode: string;
  notes: string;
  phone: string;
}
type AccountstoreType = {
  addressList: addressListtype[];
  getAllAddress: (userId: string | undefined) => Promise<getAddress[]>;
  addAddress: (formData: Address) => Promise<{ success: boolean } | undefined>;
  deletAddress: ({
    userId,
    addressId,
  }: {
    userId: string | undefined;
    addressId: string | undefined;
  }) => Promise<{ success: boolean } | undefined>;
  editAddress: ({
    userId,
    addressId,
    formData,
  }: {
    userId: string | undefined;
    addressId: string | undefined;
    formData: Address | undefined;
  }) => Promise<{ success: boolean } | undefined>;
};
export const AccountStore = create<AccountstoreType>(() => ({
  addressList: [],
  getAllAddress: async (userId) => {
    try {
      const res = await axiosInstance.get(`/shop/address/get/${userId}`);
      console.log(res);

      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  addAddress: async (formData) => {
    try {
      const res = await axiosInstance.post(`/shop/address/add`, formData);
      console.log(res.data.success);
      return res.data.success;
    } catch (error) {
      console.log(error);
    }
  },
  deletAddress: async ({ userId, addressId }) => {
    try {
      const res = await axiosInstance.delete(
        `/shop/address/delete/${userId}/${addressId}`
      );
      console.log(res);

      return res.data.success;
    } catch (error) {
      console.log(error);
    }
  },
  editAddress: async ({ userId, addressId, formData }) => {
    try {
      const res = await axiosInstance.put(
        `/shop/address/update/${userId}/${addressId}`,
        formData
      );

      return res.data.success;
    } catch (error) {
      console.log(error);
    }
  },
}));
