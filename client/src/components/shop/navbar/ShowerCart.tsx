import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { useState } from "react";
import { ShopCart } from "../../../store/user/ShopCart";

import CartTable from "../../../page/shop/CartTable";
import { useQuery } from "@tanstack/react-query";
import { Authstore } from "../../../store/admin/Authstore";

function ShowerCart() {
  const { fetchToCart } = ShopCart((state) => state);
  const { user } = Authstore((state) => state);
  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchToCart(user?.id),
  });
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        style={{ position: "relative" }}
        variant="filled"
        onClick={showDrawer}>
        <span
          style={{
            position: "absolute",
            top: "-10px",
            right: "0px",
            width: "20px",
            height: "20px",
            borderRadius: "100%",
            display: "grid",
            placeContent: "center",
            color: "white",
            backgroundColor: "purple",
          }}>
          {cart?.length.toLocaleString("fa-IR")}
        </span>
        <ShoppingCartOutlined />
      </Button>
      <Drawer
        title="سبد خرید"
        placement="bottom"
        closable={false}
        onClose={onClose}
        open={open}>
        <CartTable data={cart} />
      </Drawer>
    </div>
  );
}

export default ShowerCart;
