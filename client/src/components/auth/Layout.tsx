import React from "react";
import { Col, Row, theme } from "antd";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  const { useToken } = theme;
  const { token } = useToken();
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    card: {
      backgroundColor: token.purple7,
      minHeight: "100vh",
      width: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderTopLeftRadius: "75px",
      borderBottomLeftRadius: "75px",
      border: "1px solid primary",
    },
  };
  return (
    <Row style={styles.container}>
      {/* کارت که فقط در md و بزرگ‌تر نمایش داده می‌شود
      <Col style={styles.card} sm={0} md={12}>
        ojqojd[ojd[q[qdj]]]
      </Col> */}
      {/* Outlet که همیشه نمایش داده می‌شود */}
      <Col span={24} md={12}>
        <Outlet />
      </Col>
    </Row>
  );
}

export default AuthLayout;
