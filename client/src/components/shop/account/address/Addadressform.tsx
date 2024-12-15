import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
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

function Addadressform({ handleCancel }: { handleCancel: () => void }) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { addAddress } = AccountStore((state) => state);
  const { user } = Authstore((state) => state);

  const { mutate, isPending } = useMutation({
    mutationKey: ["addToAddress"],
    mutationFn: addAddress,
    onSuccess: (data) => {
      console.log(data);

      if (data) {
        toast.success("آدرس با موفقیت اضافه شد");
        queryClient.invalidateQueries("address");
        form.resetFields();
        handleCancel();
      } else {
        toast.error("خطابعد ازبررسی دوباره تلاش کنید");
      }
    },
  });
  const onFinish = async (value: Values) => {
    console.log(value);
    const formData = {
      ...value,
      userId: user?.id,
    };
    console.log(formData);
    mutate(formData);
  };
  return (
    <div>
      <Form
        form={form}
        name="normal_login"
        initialValues={{
          notes: "",
          pincode: "",
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
            {isPending ? "..." : "ارسال"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Addadressform;
