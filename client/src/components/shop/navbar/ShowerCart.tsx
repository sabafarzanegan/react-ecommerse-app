import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { useState } from "react";
import { ShopCart } from "../../../store/user/ShopCart";

import { convertToPersianNumber } from "../../../utils/helper";
import CartTable from "../../../page/shop/CartTable";

function ShowerCart() {
  const { Cart } = ShopCart((state) => state);

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
          {convertToPersianNumber(Cart.length)}
        </span>
        <ShoppingCartOutlined />
      </Button>
      <Drawer
        title="سبد خرید"
        placement="bottom"
        closable={false}
        onClose={onClose}
        open={open}>
        <CartTable data={Cart} />
      </Drawer>
    </div>
  );
}

export default ShowerCart;