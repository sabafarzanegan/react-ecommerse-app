import { Link } from "react-router-dom";
import { menuItems } from "../../../utils/helper";
import { Button, Drawer, Dropdown, MenuProps, Space } from "antd";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Authstore } from "../../../store/admin/Authstore";

function Menu() {
  const [open, setOpen] = useState(false);
  const { user } = Authstore((state) => state);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const onClick: MenuProps["onClick"] = ({ key }) => {};
  const items: MenuProps["items"] = [
    {
      label: <Link to="/shop/account">{user?.email}</Link>,
      key: "1",
    },
    {
      label: (
        <Button style={{ width: "100%" }} variant="filled" color="danger">
          خروج
        </Button>
      ),
      key: 2,
    },
  ];
  return (
    <div>
      <div className="menu-container">
        <ul className="links">
          {menuItems.map((item) => (
            <li>
              <Link to={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="menu-mobile">
        <Button style={{ cursor: "pointer" }} onClick={showDrawer}>
          <MenuOutlined />
        </Button>
        <Drawer title="منوها" onClose={onClose} open={open}>
          <ul className="links-mobile">
            {menuItems.map((item) => (
              <li>
                <Link to={item.link}>{item.name}</Link>
              </li>
            ))}

            <Dropdown menu={{ items, onClick }}>
              <a
                style={{ marginTop: "4px", color: "#531dab" }}
                onClick={(e) => e.preventDefault()}>
                <Space>مشخصات کاربر</Space>
              </a>
            </Dropdown>
          </ul>
        </Drawer>
      </div>
    </div>
  );
}

export default Menu;
