import { Carousel } from "antd";
import { imgCategory } from "../../../utils/helper";

function Categorysection() {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3 style={{ textAlign: "center" }}>دسته بندی ها</h3>
      <Carousel
        autoplaySpeed={5000}
        arrows
        infinite={true}
        slidesToShow={5}
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
        ]}
        style={{ padding: "20px 0px" }}
        autoplay>
        {imgCategory.map((item) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <img
              style={{ width: "90px", height: "100%", margin: "0 auto" }}
              src={item.src}
              alt={item.title}
            />
            <p
              style={{
                textAlign: "center",
                fontSize: "16px",
                padding: "5px 0px",
              }}>
              {item.title}
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Categorysection;
