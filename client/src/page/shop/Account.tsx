import { Authstore } from "../../store/admin/Authstore";
import "../../components/shop/account/account.css";
import { UserOutlined } from "@ant-design/icons";
import { Tabs, TabsProps } from "antd";
import Address from "../../components/shop/account/address/Address";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "سفارشات",
    children: "Content of Tab Pane 1",
  },
  {
    key: "2",
    label: "آدرس ها",
    children: <Address />,
  },
];

function Account() {
  const { user } = Authstore((state) => state);

  return (
    <section>
      <div className="header-account">
        <span>
          حساب کاربری
          <UserOutlined className="icon" />
        </span>
        <p>{user?.email}</p>
      </div>
      <div>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </section>
  );
}

export default Account;
