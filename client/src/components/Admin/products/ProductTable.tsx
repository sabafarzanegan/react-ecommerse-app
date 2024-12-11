import { Table, Button, Space, Drawer } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Productstore } from "../../../store/admin/Productstore";
import { Product } from "../../../utils/Type";
import { useState } from "react";
import Editproduct from "./Editproduct";
function ProductTable() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const queryClient = useQueryClient();
  const { fetchAllProduct } = Productstore();
  const { deleteProduct } = Productstore();
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProduct,
  });

  const { mutate } = useMutation({
    mutationKey: ["delete"],
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  const columns = [
    {
      title: "تصویر",
      dataIndex: "image",
      key: "image",
      render: (text: string) => (
        <img
          loading="lazy"
          src={text}
          alt="product"
          style={{ width: "60px" }}
        />
      ),
    },
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "برند",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "قیمت",
      dataIndex: "price",
      key: "price",
      render: (text: number) => `${text.toLocaleString("fa-IR")} تومان`,
    },
    {
      title: "مقدار تخفیف",
      dataIndex: "salePrice",
      key: "salePrice",
      render: (text: number) => `${text.toLocaleString("fa-IR")} تومان`,
    },
    {
      title: "عملیات",
      key: "actions",
      render: (record: Product) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />

          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  const handleEdit = (record: Product) => {
    setIsDrawerOpen(true);
    setCurrentProduct(record);
  };

  const handleDelete = (record: Product) => {
    mutate(record._id);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setCurrentProduct(null);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record._id}
        loading={isLoading}
        pagination={{
          style: {},

          pageSize: 5,
          showSizeChanger: false,
        }}
      />
      <Drawer
        title="ویرایش محصول"
        width={400}
        onClose={closeDrawer}
        open={isDrawerOpen}>
        <Editproduct
          closeDrawer={closeDrawer}
          key={currentProduct?._id}
          productData={currentProduct}
        />
      </Drawer>
    </>
  );
}

export default ProductTable;
