import { Button, Form, Grid, Input, Select, theme, Upload } from "antd";
import {
  DollarOutlined,
  FileTextOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import {
  MutationVariables,
  Productstore,
} from "../../../store/admin/Productstore";
import { UploadImageInSupabase } from "../../../utils/supabase";

import { Product } from "../../../utils/Type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { brandProduct, categoryProduct } from "../../../utils/helper";

const { useToken } = theme;
const { useBreakpoint } = Grid;

export interface Values {
  image?: { file: File; fileList: { originFileObj: File }[] };
  description?: string;
  title?: string;
  category?: string;
  brand?: string;
  price?: string;
  salePrice?: string;
  totalStock?: string;
}

export default function Editproduct({
  productData,
  closeDrawer,
}: {
  productData: Product | null;
  closeDrawer: () => void;
}) {
  const { token } = useToken();
  const screens = useBreakpoint();
  const { editProduct } = Productstore((state) => state);
  const [fileList, setFileList] = useState<any[]>([]);
  const queryClient = useQueryClient();

  const { mutate } = useMutation<
    { success: boolean } | undefined,
    Error,
    MutationVariables
  >({
    mutationKey: ["edit"],
    mutationFn: editProduct,
    onSuccess: (data) => {
      if (data?.success) {
        if (data?.success) {
          toast.success("محصول با موفقیت اصلاح شد");
          closeDrawer();
          queryClient.invalidateQueries("products");
        } else {
          toast.error("خطابعد ازبررسی دوباره تلاش کنید");
        }
      }
    },
  });
  const onFinish = async (values: Values) => {
    console.log("Received values of form: ", values);

    let uploadedImageUrl = productData?.image || "";

    const fileList = values?.image?.fileList ?? [];
    if (fileList.length > 0) {
      const file = fileList[0]?.originFileObj;
      if (file) {
        const uploadResult = await UploadImageInSupabase(file);
        uploadedImageUrl = uploadResult || "";
      }
    }

    try {
      mutate({
        values: {
          image: uploadedImageUrl,
          description: values.description,
          title: values.title,
          category: values.category,
          brand: values.brand,
          price: Number(values.price),
          salePrice: Number(values.salePrice),
          totalStock: Number(values.totalStock),
        },
        productId: productData?._id,
      });
    } catch (error) {}
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
          initialValues={{
            image: productData?.image
              ? [
                  {
                    uid: "-1",
                    name: "current_image",
                    status: "done",
                    url: productData.image,
                  },
                ]
              : [],
            description: productData?.description,
            title: productData?.title,
            category: productData?.category,
            brand: productData?.brand,
            price: productData?.price,
            salePrice: productData?.salePrice,
            totalStock: productData?.totalStock,
          }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional">
          <Form.Item name="image" label="عکس محصول">
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
          <Form.Item name="title">
            <Input prefix={<FileTextOutlined />} placeholder="عنوان" />
          </Form.Item>
          <Form.Item name="description">
            <Input prefix={<FileTextOutlined />} placeholder="توضیحات" />
          </Form.Item>

          <Form.Item name="category">
            <Select options={categoryProduct} placeholder="دسته بندی" />
          </Form.Item>

          <Form.Item name="brand">
            <Select options={brandProduct} placeholder="برند" />
          </Form.Item>

          <Form.Item name="price">
            <Input prefix={<DollarOutlined />} placeholder="قیمت" />
          </Form.Item>

          <Form.Item name="salePrice">
            <Input prefix={<DollarOutlined />} placeholder="قیمت تخفیف خورده" />
          </Form.Item>

          <Form.Item name="totalStock">
            <Input style={{ width: "100%" }} placeholder="تعداد" />
          </Form.Item>

          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block={true} type="primary" htmlType="submit">
              اصلاح
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}
