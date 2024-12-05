import React, { useState } from "react";
import {
  BarChartOutlined,
  DashboardFilled,
  LogoutOutlined,
  OrderedListOutlined,
  ProductFilled,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Flex, Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import { Authstore } from "../../store/Authstore";
import { Typography } from "antd";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "1",
    icon: <DashboardFilled />,
    label: <Link to="/admin/dashboard">داشبورد</Link>,
  },
  {
    key: "2",
    icon: <OrderedListOutlined />,
    label: <Link to="/admin/orders">سفارشات</Link>,
  },
  {
    key: "3",
    icon: <BarChartOutlined />,
    label: <Link to="/admin/featuers">ویژگیها</Link>,
  },
  {
    key: "4",
    icon: <ProductFilled />,
    label: <Link to="/admin/products">محصولات</Link>,
  },
];

const boxStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 6,
};

function AdminLayou() {
  const { user } = Authstore((state) => state);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { Text } = Typography;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          style={{ fontWeight: "bold" }}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="vertical"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: "0px 16px", background: colorBgContainer }}>
          <Flex style={boxStyle} justify="space-between" align="center">
            <Button variant="filled" icon={<LogoutOutlined />} color="danger">
              خروج
            </Button>
            <p>
              <span>
                سلام{" "}
                <Text type="success" style={{ fontWeight: "bold" }}>
                  {user?.userName}
                </Text>
              </span>
            </p>
          </Flex>
        </Header>
        <Content style={{ margin: "2px 16px" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default AdminLayou;
