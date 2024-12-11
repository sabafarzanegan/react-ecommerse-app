import { HomeOutlined } from "@ant-design/icons";

import "./navbar.css";
import Menu from "./Menu";
import Dropdownuser from "./Dropdown";
import ShowerCart from "./ShowerCart";
function Navbar() {
  return (
    <div className="nav-container">
      <Dropdownuser />
      <div className="shop-cart">
        <ShowerCart />
      </div>
      <Menu />
      <div className="logo">
        <p>Ecommerse</p>
        <span>
          <HomeOutlined />
        </span>
      </div>
    </div>
  );
}

export default Navbar;
