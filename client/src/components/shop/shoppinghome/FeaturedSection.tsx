import { useQuery } from "@tanstack/react-query";
import { Productstore } from "../../../store/admin/Productstore";
import ProductCard from "../productCard";
import { Carousel } from "antd";

function FeaturedSection() {
  const { fetchAllProduct } = Productstore((state) => state);
  const { data } = useQuery({
    queryKey: ["fetchAllProduct"],
    queryFn: fetchAllProduct,
  });
  return (
    <>
      <h3
        style={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "10px",
        }}>
        آخرین محصولات
      </h3>
      <div
        style={{
          backgroundColor: "#ed2d96",
          borderRadius: "10px",
          padding: "25px 15px",
        }}>
        <Carousel
          autoplaySpeed={5000}
          arrows
          infinite={true}
          slidesToShow={3}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ]}
          autoplay>
          {data?.slice(-6).map((item) => (
            <ProductCard product={item} />
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default FeaturedSection;
