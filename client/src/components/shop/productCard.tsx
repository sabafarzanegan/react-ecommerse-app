import { Button, Card, Flex } from "antd";
import "./shop.css";
import { Product } from "../../utils/Type";
import { calculateDiscount } from "../../utils/helper";

import ButtonCard from "./cart/ButtonCard";

import { Link } from "react-router-dom";

function ProductCard({ product }: { product: Product }) {
  const { price, salePrice } = product;
  return (
    <Card
      style={{
        maxWidth: "270px",

        margin: "0px auto",
        width: "100%",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
      cover={
        <Link to={`/shop/listing/${product._id}`}>
          <img
            loading="lazy"
            style={{ maxHeight: "300px", height: "100%", width: "100%" }}
            alt="example"
            src={product.image}
          />
        </Link>
      }>
      <h4 style={{ WebkitLineClamp: 2, textAlign: "right" }}>
        {product.title}
      </h4>
      {/* <Flex
        align="center"
        justify="space-between"
        style={{ marginTop: "30px" }}>
        <Badge.Ribbon
          // style={{ position: "absolute", top: "-200px", left: "-60px" }}
          text={product.brand}
          color="pink"
        />
        <Badge.Ribbon
          // style={{ position: "absolute", top: "-200px", left: "-60px" }}
          text={product.category}
          color="pink"
        />
      </Flex> */}
      <Flex
        style={{ margin: "5px 0px" }}
        align="center"
        justify="space-between">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0px 7px",
          }}>
          {product.salePrice > 0 && (
            <Button color="danger" variant="filled">
              {calculateDiscount(price, salePrice).substring(0, 2)}%
            </Button>
          )}

          <span
            style={{
              textDecoration: `${salePrice > 0 && "line-through"}`,
              color: "gray",
            }}>
            {price.toLocaleString("fa-IR")}
            تومان
          </span>
        </div>
        {salePrice > 0 && (
          <span style={{ fontWeight: "500" }}>
            {salePrice.toLocaleString("fa-IR")}
            تومان
          </span>
        )}
      </Flex>

      <ButtonCard product={product} />
    </Card>
  );
}

export default ProductCard;
