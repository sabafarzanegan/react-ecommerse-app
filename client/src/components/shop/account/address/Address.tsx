import { Button, Card, Modal, Spin } from "antd";
import { useState } from "react";
import Addadressform from "./Addadressform";
import { AccountStore } from "../../../../store/user/AccountStore";
import { Authstore } from "../../../../store/admin/Authstore";
import { useQuery } from "@tanstack/react-query";
import { convertToPersianNumber } from "../../../../utils/helper";
import AddressCard from "./AddressCard";

function Address() {
  const { getAllAddress } = AccountStore((state) => state);
  const { user } = Authstore((state) => state);
  const { data, isLoading } = useQuery({
    queryKey: ["address"],
    queryFn: () => getAllAddress(user?.id),
  });
  console.log(data);

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
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10px",
        }}>
        <Spin />
      </div>
    );
  }
  return (
    <Card>
      <div>
        <Button onClick={showModal} color="primary" type="primary">
          افزودن آدرس
        </Button>
        <Modal
          title="آدرس"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}>
          <Addadressform handleCancel={handleCancel} />
        </Modal>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0px 5px",
            marginTop: "10px",
          }}>
          {data?.map((item) => (
            <AddressCard item={item} />
          ))}
        </div>
      </div>
    </Card>
  );
}

export default Address;
