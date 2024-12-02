import { Button, Form, Grid, Input, theme, Typography } from "antd";

import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Authstore } from "../../store/Authstore";
import { toast } from "react-toastify";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

interface Values {
  userName: string;
  email: string;
  password: string;
}

export default function Registerform() {
  const { Registeruser } = Authstore((state) => state);
  const navigate = useNavigate();
  const { mutate, isPending, error } = useMutation({
    mutationFn: Registeruser,
    onSuccess: (data) => {
      if (data?.success) {
        navigate("/auth/login");
        toast.success("ثبت نام شماباموفقیت انجام شد", {
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
        toast.error(error?.message, {
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
  const { token } = useToken();
  const screens = useBreakpoint();

  const onFinish = (values: Values) => {
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
    <div>
      <div style={{ marginTop: "20px" }}></div>
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.header}>
            <Title style={styles.title}>ثبت نام</Title>
            <Text style={styles.text}>حساب کاربری بسازید</Text>
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
              name="userName"
              rules={[
                {
                  required: true,
                  message: "نام کاربری خودرا وارید کنید",
                },
              ]}>
              <Input prefix={<UserOutlined />} placeholder="username" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "ایمیل را وارید کنید",
                },
              ]}>
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "رمز عبور انتخابی خود را وارید کنید",
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
                {isPending ? "در حال ثبت نام" : "ثبت نام"}
              </Button>
              <div style={styles.footer}>
                <Text style={styles.text}>حساب کاربری دارید؟</Text>
                <Link style={styles.link} to="/auth/login">
                  ورود
                </Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </section>
    </div>
  );
}
