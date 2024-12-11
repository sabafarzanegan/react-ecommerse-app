import { Table } from "antd";
import { Cart } from "../../store/user/ShopCart";
import { Link } from "react-router-dom";

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

function CartTable({ data }: { data: Cart[] }) {
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey={(record) => record.productId}
      pagination={{
        style: {},
        pageSize: 5,
        showSizeChanger: false,
      }}
    />
  );
}

export default CartTable;
