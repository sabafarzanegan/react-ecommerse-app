import { UserOutlined } from "@ant-design/icons";

import { Avatar, Button, Dropdown, MenuProps, Space } from "antd";

import { Authstore } from "../../../store/admin/Authstore";
import { Link } from "react-router-dom";

const onClick: MenuProps["onClick"] = ({ key }) => {};

function Dropdownuser() {
  const { user } = Authstore((state) => state);

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
    <div className="dropdown-container">
      <Dropdown menu={{ items, onClick }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Avatar
              style={{ backgroundColor: "#531dab", cursor: "pointer" }}
              size="default"
              icon={<UserOutlined />}
            />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}

export default Dropdownuser;
