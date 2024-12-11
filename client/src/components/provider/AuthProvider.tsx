import React, { useEffect } from "react";
import { ReactNode } from "react";
import { Authstore } from "../../store/admin/Authstore";
import { Navigate, useLocation } from "react-router-dom";
import { ShopCart } from "../../store/user/ShopCart";

function AuthProvider({ children }: { children?: ReactNode }) {
  const { user, isAuthenticated } = Authstore((state) => state);

  const { pathname } = useLocation();

  if (pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/shoppinghome" />;
      }
    }
  }

  if (
    !isAuthenticated &&
    !(pathname.includes("/login") || pathname.includes("/register"))
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (pathname.includes("/login") || pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/shoppinghome" />;
    }
  }

  if (isAuthenticated && user?.role !== "admin" && pathname.includes("admin")) {
    return <Navigate to="/not-auth" />;
  }

  return <div>{children}</div>;
}

export default AuthProvider;
