import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/Layout";
import Register from "./page/auth/Register";
import Login from "./page/auth/Login";
import AdminLayout from "./components/Admin/Layout";
import Admindash from "./page/Admin/Admindash";
import Adminproducts from "./page/Admin/Adminproducts";
import Adminorders from "./page/Admin/Adminorders";
import Adminfeatuers from "./page/Admin/Adminfeatuers";
import Shoplayout from "./components/shop/Shoplayout";
import Shoppinghome from "./page/shop/Shoppinghome";
import Listing from "./page/shop/Listing";
import Checkout from "./page/shop/Checkout";
import Notfound from "./page/Notfound/Notfound";
import Notauth from "./page/Notfound/Notauth";
import AuthProvider from "./components/provider/AuthProvider";
import { Authstore } from "./store/admin/Authstore";
import { Flex, Spin } from "antd";
import { useEffect } from "react";
import Account from "./page/shop/Account";
import ProductDetail from "./page/shop/ProductDetail";
import { useQuery } from "@tanstack/react-query";

function App() {
  const { isLoading, initializeAuth } = Authstore();
  const { user } = Authstore((state) => state);
  const { fetchToCart, Cart } = ShopCart((state) => state);
  const userId = user?.id;
  useQuery({
    queryKey: ["cart", userId],
    queryFn: () => fetchToCart(userId),
  });
  console.log(Cart);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isLoading) {
    return (
      <Flex align="center" gap="middle">
        <Spin size="small" />
        <Spin />
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<AuthProvider></AuthProvider>} />
        <Route
          path="/auth"
          element={
            <AuthProvider>
              <AuthLayout />
            </AuthProvider>
          }>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route
          path="/admin"
          element={
            <AuthProvider>
              <AdminLayout />
            </AuthProvider>
          }>
          <Route path="dashboard" element={<Admindash />} />
          <Route path="products" element={<Adminproducts />} />
          <Route path="orders" element={<Adminorders />} />
          <Route path="featuers" element={<Adminfeatuers />} />
        </Route>
        <Route
          path="/shop"
          element={
            <AuthProvider>
              <Shoplayout />
            </AuthProvider>
          }>
          <Route path="shoppinghome" element={<Shoppinghome />} />
          <Route path="listing" element={<Listing />} />
          <Route path="listing/:productId" element={<ProductDetail />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="account" element={<Account />} />
        </Route>
        <Route path="/not-auth" element={<Notauth />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}
import { ShopCart } from "./store/user/ShopCart";

export default App;
