import { Button, Form, Grid, Input, theme, Typography } from "antd";

import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Authstore } from "../../store/admin/Authstore";
import { toast } from "react-toastify";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

interface Values {
  email: string;
  password: string;
}

export default function Loginform() {
  const { Loginuser } = Authstore((state) => state);

  const { token } = useToken();
  const screens = useBreakpoint();
  const { mutate, isPending } = useMutation({
    mutationFn: Loginuser,
    onSuccess: (data) => {
      console.log(data);

      if (data?.success) {
        toast.success("ورود شماباموفقیت انجام شد", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("خطابعد ازبررسی دوباره تلاش کنید", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    },
  });
  const onFinish = (values: Values) => {
    console.log("Received values of form: ", values);
    mutate(values);
  };

  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px",
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center" as "center",
      display: "flex" as "flex",
      alignItems: "center" as "center",
      justifyContent: "space-between" as "space-between",
    },
    forgotPassword: {
      float: "right",
    },
    header: {
      marginBottom: token.marginXL,
      textAlign: "right" as "right",
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "100vh" : "auto",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
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

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <Title style={styles.title}>ورود</Title>
          <Text style={styles.text}>خوشحالیم که دوباره برگشتید</Text>
        </div>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional">
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "ایمیل خودرا وارد کنید",
              },
            ]}>
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "رمز عبور را وارد کنید",
              },
            ]}>
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: "0px" }}>
            <Button
              disabled={isPending}
              block={true}
              type="primary"
              htmlType="submit">
              {isPending ? "در حال ورود..." : "ورود"}
            </Button>
            <div style={styles.footer}>
              <Text style={styles.text}>حساب کاربری ندارید؟</Text>
              <Link style={styles.link} to="/auth/register">
                ثبت نام
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}
