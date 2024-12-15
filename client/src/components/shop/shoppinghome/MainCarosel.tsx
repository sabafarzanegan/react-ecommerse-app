import { Carousel } from "antd";
import { imgSlider } from "../../../utils/helper";
const contentStyle: React.CSSProperties = {
  height: "400px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  width: "100%",
  borderRadius: "20px",
};

function MainCarosel() {
  return (
    <Carousel arrows infinite={true} autoplay>
      {imgSlider.map((item) => (
        <div>
          <img style={contentStyle} src={item.src} alt="img slider" />
        </div>
      ))}
    </Carousel>
  );
}

export default MainCarosel;
