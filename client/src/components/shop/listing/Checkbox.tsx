import { Checkbox } from "antd";
import { brandProduct, menuItems } from "../../../utils/helper";
function FilterCheckbox() {
  return (
    <div>
      <p
        style={{ marginBottom: "10px", marginTop: "10px", fontWeight: "bold" }}>
        دسته بندی
      </p>
      <div className="checkbox-container">
        {menuItems.map((item) => (
          <Checkbox>{item.name}</Checkbox>
        ))}
      </div>
      <p
        style={{ marginBottom: "10px", marginTop: "15px", fontWeight: "bold" }}>
        برندها
      </p>
      <div className="checkbox-container">
        {brandProduct.map((item) => (
          <Checkbox>{item.value}</Checkbox>
        ))}
      </div>
    </div>
  );
}

export default FilterCheckbox;
