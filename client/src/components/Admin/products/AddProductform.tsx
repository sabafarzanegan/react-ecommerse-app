import {
  Button,
  Form,
  Grid,
  Input,
  InputNumber,
  Select,
  theme,
  Upload,
} from "antd";
import {
  DollarOutlined,
  FileTextOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Productstore } from "../../../store/admin/Productstore";
import { UploadImageInSupabase } from "../../../utils/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { brandProduct, categoryProduct } from "../../../utils/helper";

const { useToken } = theme;
const { useBreakpoint } = Grid;

interface Values {
  image: { file: File; fileList: { originFileObj: File }[] };
  description: string;
  title: string;
  category: string;
  brand: string;
  price: string;
  salePrice: string;
  totalStock: string;
}

export default function AddProductform({ onCLose }: { onCLose: () => void }) {
  const { token } = useToken();
  const screens = useBreakpoint();
  const { Addproduct } = Productstore((state) => state);
  const [fileList, setFileList] = useState<any[]>([]);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { mutate, isPending, status } = useMutation({
    mutationKey: ["addProduct"],
    mutationFn: Addproduct,
    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries("products");

      if (data?.success) {
        toast.success("محصول با موفقیت اضافه شد");
        onCLose();
        form.resetFields();
      } else {
        toast.error("خطابعد ازبررسی دوباره تلاش کنید");
      }
    },
  });
  const onFinish = async (values: Values) => {
    console.log("Received values of form: ", values);
    const file = values.image?.fileList[0]?.originFileObj;

    try {
      const res = await UploadImageInSupabase(file);
      console.log(res);

      mutate({
        image: res,
        description: values.description,
        title: values.title,
        category: values.category,
        brand: values.brand,
        price: Number(values.price),
        salePrice: Number(values.salePrice),
        totalStock: Number(values.totalStock),
      });
      console.log("status", status);
    } catch (error) {
      console.log(error);
    }
  };

  const styles = {
    container: {
      margin: "0 auto",
      width: "500px",
    },

    header: {
      marginBottom: token.marginXL,
      textAlign: "right" as "right",
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
    },
    text: {
      color: token.colorTextSecondary,
      fontWeight: "bold",
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
    link: {
      color: token.purple6,
      padding: "0px 5px",
      fontWeight: "semi-bold",
      fontFamily: "vazir",
      display: "block",
    },
  };

  const handleChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

  const handlePreview = async (file: any) => {
    const src =
      file.url ||
      (await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result as string);
      }));
    const imgWindow = window.open(src);
    if (imgWindow)
      imgWindow.document.write(`<img src="${src}" style="max-width:100%;">`);
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <Form
          form={form}
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional">
          <Form.Item
            name="image"
            label="عکس محصول"
            rules={[
              {
                required: true,
                message: "لطفاً یک عکس انتخاب کنید",
              },
            ]}>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
              onPreview={handlePreview}
              beforeUpload={() => false}>
              {fileList.length >= 1 ? null : (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>آپلود</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: "عنوان را وارد کنید",
              },
            ]}>
            <Input prefix={<FileTextOutlined />} placeholder="عنوان" />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "توضیحات را وارد کنید",
              },
            ]}>
            <Input prefix={<FileTextOutlined />} placeholder="توضیحات" />
          </Form.Item>

          <Form.Item
            name="category"
            rules={[
              {
                required: true,
                message: "دسته بندی را انتخاب کنید",
              },
            ]}>
            <Select options={categoryProduct} placeholder="دسته بندی" />
          </Form.Item>

          <Form.Item
            name="brand"
            rules={[
              {
                required: true,
                message: " برند را انتخاب کنید",
              },
            ]}>
            <Select options={brandProduct} placeholder="برند" />
          </Form.Item>

          <Form.Item
            name="price"
            rules={[
              {
                required: true,
                message: " قیمت را وارد کنید",
              },
            ]}>
            <Input prefix={<DollarOutlined />} placeholder="قیمت" />
          </Form.Item>

          <Form.Item
            name="salePrice"
            rules={[
              {
                required: true,
                message: " قیمت را وارد کنید",
              },
            ]}>
            <Input prefix={<DollarOutlined />} placeholder="قیمت تخفیف خورده" />
          </Form.Item>

          <Form.Item
            name="totalStock"
            rules={[
              {
                required: true,
                message: " تعداد محصول را وارد کنید",
              },
            ]}>
            <InputNumber style={{ width: "100%" }} placeholder="تعداد" />
          </Form.Item>

          <Form.Item style={{ marginBottom: "0px" }}>
            <Button
              disabled={isPending}
              block={true}
              type="primary"
              htmlType="submit">
              ساختن
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}
