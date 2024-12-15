import { Button, Form, Input } from "antd";
import { getAddress } from "../../../../utils/Type";
import TextArea from "antd/es/input/TextArea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AccountStore } from "../../../../store/user/AccountStore";
import { Authstore } from "../../../../store/admin/Authstore";
import { toast } from "react-toastify";
interface Values {
  address: string;
  city: string;
  phone: string;
  pincode: string;
  notes: string;
}
function EditAddressform({
  item,
  handleCancel,
}: {
  item: getAddress;
  handleCancel: () => void;
}) {
  const { editAddress } = AccountStore((state) => state);
  const { user } = Authstore((state) => state);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["addToAddress"],
    mutationFn: editAddress,
    onSuccess: (data) => {
      console.log(data);
      if (data) {
        toast.success("آدرس با موفقیت اضافه شد");
        queryClient.invalidateQueries("address");
        handleCancel();
      } else {
        toast.error("خطابعد ازبررسی دوباره تلاش کنید");
      }
    },
  });

  const onFinish = async (value: Values) => {
    console.log(value);
    const formData = { ...value, userId: user?.id };
    mutate({ userId: user?.id, addressId: item._id, formData });
  };
  return (
    <div>
      <Form
        name="normal_login"
        initialValues={{
          address: item.address,
          city: item.city,
          phone: item.phone,
          notes: item.notes,
          pincode: item.pincode,
        }}
        onFinish={onFinish}
        layout="vertical"
        requiredMark="optional">
        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: "آدرس را وارد کنید",
            },
          ]}>
          <Input placeholder="آدرس" />
        </Form.Item>
        <Form.Item
          name="city"
          rules={[
            {
              required: true,
              message: "شهر را وارد کنید",
            },
          ]}>
          <Input placeholder="شهر" />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: " شماره همراه را وارد کنید",
            },
          ]}>
          <Input placeholder="شماره همراه" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "توضیحات را وارد کنید",
            },
          ]}
          name="notes">
          <TextArea placeholder="توضیحات" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "کد پستی را وارد کنید",
            },
          ]}
          style={{ display: "" }}
          name="pincode">
          <Input style={{ display: "" }} placeholder="کد" />
        </Form.Item>

        <Form.Item style={{ marginBottom: "0px" }}>
          <Button
            disabled={isPending}
            block={true}
            type="primary"
            htmlType="submit">
            {isPending ? "..." : "اصلاح"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default EditAddressform;
