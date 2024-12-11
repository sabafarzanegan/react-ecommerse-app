import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Shopstore } from "../../store/user/Shopstore";
import "./productDetal.css";
import { Breadcrumb, Button, Spin } from "antd";
import ButtonCard from "../../components/shop/cart/ButtonCard";
import { gray } from "@ant-design/colors";
import { calculateDiscount, convertToPersianNumber } from "../../utils/helper";
function ProductDetail() {
  const { productId } = useParams();
  const { getDetailProduct } = Shopstore((state) => state);
  const { data, isLoading } = useQuery({
    queryKey: ["detailProduct"],
    queryFn: () => getDetailProduct(productId),
  });
  console.log(data);
  if (isLoading) {
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}>
      <Spin tip="Loading" size="small" />
    </div>;
  }
  return (
    <section>
      <div>
        <Breadcrumb
          items={[
            {
              title: <span>{data?.brand}</span>,
            },
            {
              title: <span>{data?.category}</span>,
            },
          ]}
        />
      </div>
      <div className="content-container">
        <div>
          <img src={data?.image} alt={data?.title} />
        </div>
        <div>
          <h3>{data?.title}</h3>
          <span>{data?.description}</span>
          <ButtonCard product={data} />
        </div>
        <div>
          <div>
            {data?.salePrice
              ? data?.salePrice > 0 && (
                  <div className="discount-container">
                    <div>
                      <p
                        style={{
                          textDecoration: "line-through ",
                          color: "gray",
                        }}>
                        {convertToPersianNumber(data.price)}تومان
                      </p>
                      <p>{convertToPersianNumber(data?.salePrice)}تومان</p>
                    </div>

                    <div>
                      <Button variant="filled" color="danger">
                        {calculateDiscount(data.price, data.salePrice)}%
                      </Button>
                    </div>
                  </div>
                )
              : ""}
          </div>
          {data?.salePrice === 0 && (
            <p>{convertToPersianNumber(data.price)}تومان</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
