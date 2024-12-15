import { Table } from "antd";
import { Cart, ShopCart } from "../../store/user/ShopCart";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Authstore } from "../../store/admin/Authstore";

const columns = [
  {
    title: "تصویر",
    dataIndex: "image",
    key: "image",
    render: (text: string, record: Cart) => (
      <Link to={`/shop/listing/${record.productId}`}>
        <img src={text} alt="product" style={{ width: "60px" }} />
      </Link>
    ),
  },
  {
    title: "عنوان",
    dataIndex: "title",
    key: "title",
    render: (text: string, record: Cart) => (
      <Link
        style={{ fontSize: "16px" }}
        to={`/shop/listing/${record.productId}`}>
        <span>{text}</span>
      </Link>
    ),
  },
  {
    title: "تعداد",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "قیمت کل",
    key: "totalPrice",

    render: (_: any, record: Cart) => {
      const totalPrice =
        record.salePrice > 0
          ? record.quantity * record.salePrice
          : record.quantity * record.price;

      return `${totalPrice.toLocaleString("fa-IR")} تومان`;
    },
  },
];

function CartTable() {
  const { fetchToCart } = ShopCart((state) => state);
  const { user } = Authstore((state) => state);
  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchToCart(user?.id),
  });
  const totalAmoutnt =
    cart?.reduce((sum, item) => {
      const price = item?.salePrice > 0 ? item?.salePrice : item?.price || 0;
      const quantity = item?.quantity || 0;
      return sum + price * quantity;
    }, 0) || 0;
  return (
    <>
      <Table
        columns={columns}
        dataSource={cart}
        rowKey={(record) => record.productId}
        pagination={{
          style: {},
          pageSize: 5,
          showSizeChanger: false,
        }}
      />
      <p>
        قیمت کل محصولات:
        <span style={{ padding: "0px 5px" }}>
          {totalAmoutnt.toLocaleString("fa-IR")}تومان
        </span>
      </p>
    </>
  );
}

export default CartTable;
