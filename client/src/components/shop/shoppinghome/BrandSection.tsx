import { imgBrand } from "../../../utils/helper";

function BrandSection() {
  return (
    <div style={{ marginTop: "40px" }}>
      <h3 style={{ textAlign: "center" }}>برترین برندها</h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "40px",
        }}>
        {imgBrand.map((item) => (
          <div>
            <img
              style={{ width: "140px", height: "100%" }}
              src={item.src}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrandSection;
