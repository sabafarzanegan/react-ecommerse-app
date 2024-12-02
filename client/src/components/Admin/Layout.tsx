import React, { useState } from "react";
import {
  AreaChartOutlined,
  BarChartOutlined,
  DashboardFilled,
  DashOutlined,
  DesktopOutlined,
  FileOutlined,
  HomeFilled,
  OrderedListOutlined,
  ProductOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  //   getItem("داشبورد", "1", <DashboardFilled />),
  //   getItem("محصولات", "2", <ProductOutlined />),
  //   getItem("سفارشات", "3", <OrderedListOutlined />),
  //   getItem("ویژگیها", "4", <BarChartOutlined />),
  {
    key: "1",
    icon: <HomeFilled />,
    label: <Link to="/home">صفحه اصلی</Link>, // لینک React Router
  },
  {
    key: "2",
    icon: <DashboardFilled />,
    label: <Link to="/admin/dashboard">داشبورد</Link>, // لینک React Router
  },
  {
    key: "3",
    icon: <OrderedListOutlined />,
    label: <Link to="/admin/orders">سفارشات</Link>, // لینک React Router
  },
  {
    key: "4",
    icon: <BarChartOutlined />,
    label: <Link to="/admin/featuers">ویژگیها</Link>, // لینک React Router
  },
];

function AdminLayou() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
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
