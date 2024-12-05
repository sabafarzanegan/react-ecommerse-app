export interface NewProduct {
  image: string | null;
  description: string | undefined;
  title: string | undefined;
  category: string | undefined;
  brand: string | undefined;
  price: number | undefined;
  salePrice: number | undefined;
  totalStock: number | undefined;
}

export interface Product {
  brand: string;
  createdAt: string;
  description: string;
  image: string;
  price: number;
  salePrice: number;
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
  totalStock: number;
  category: string;
}
