import { Button, Card, Modal, Spin } from "antd";
import { getAddress } from "../../../../utils/Type";
import { convertToPersianNumber } from "../../../../utils/helper";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { AccountStore } from "../../../../store/user/AccountStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Authstore } from "../../../../store/admin/Authstore";
import { toast } from "react-toastify";
import { useState } from "react";
import EditAddressform from "./EditAddressform";

function AddressCard({ item }: { item: getAddress }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const queryClient = useQueryClient();

  const { deletAddress } = AccountStore((state) => state);
  const { user } = Authstore((state) => state);
  const { isPending, mutate } = useMutation({
    mutationKey: ["deleteaddress"],
    mutationFn: deletAddress,
    onSuccess: (data) => {
      console.log(data);

      if (data) {
        toast.success("آدرس با موفقیت حذف شد");
        queryClient.invalidateQueries("address");
      } else {
        toast.error("خطابعد ازبررسی دوباره تلاش کنید");
      }
    },
  });

  const deleteHandler = () => {
    mutate({ userId: user?.id, addressId: item._id });
  };

  return (
    <Card style={{ flexGrow: "1", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px 0px",
        }}>
        <span>{item.address}</span>
        <span>{item.city}</span>
        <span>{item.notes}</span>
        <span>کد پستی:{convertToPersianNumber(item.pincode)}</span>
        <span>شماره همراه:{convertToPersianNumber(item.phone)}</span>
      </div>
      <div
        style={{
          marginTop: " 4px 0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <Button onClick={deleteHandler} color="danger" variant="filled">
          {isPending ? <Spin /> : <DeleteOutlined />}
        </Button>
        <div>
          <Button onClick={showModal}>
            <EditOutlined />
          </Button>
          <Modal
            title="اصلاح آدرس"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}>
            <EditAddressform handleCancel={handleCancel} item={item} />
          </Modal>
        </div>
      </div>
    </Card>
  );
}

export default AddressCard;
