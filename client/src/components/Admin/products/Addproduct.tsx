import React, { useState } from "react";
import { Button, Drawer, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddProductform from "./AddProductform";
import ProductTable from "./ProductTable";

const Addproduct: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Space style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
          اضاف کردن محصول جدید
        </Button>
      </Space>
      <Drawer open={open} onClose={onClose}>
        <AddProductform onCLose={onClose} />
      </Drawer>
      <ProductTable />
    </>
  );
};

export default Addproduct;
