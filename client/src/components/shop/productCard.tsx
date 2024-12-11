import { Badge, Button, Card, Flex } from "antd";
import "./shop.css";
import { Product } from "../../utils/Type";
import { calculateDiscount, convertToPersianNumber } from "../../utils/helper";

import ButtonCard from "./cart/ButtonCard";

import { Link } from "react-router-dom";

function ProductCard({ product }: { product: Product }) {
  const { price, salePrice } = product;
  return (
    <Card
      style={{
        maxWidth: "300px",
        margin: "0px auto",
        maxHeight: "600px",
        height: "100%",
        width: "100%",
      }}
      cover={
        <Link to={`/shop/listing/${product._id}`}>
          <img style={{ height: "100%" }} alt="example" src={product.image} />
        </Link>
      }>
      <Flex align="center" justify="space-between">
        <Badge.Ribbon
          style={{ position: "absolute", top: "-200px", left: "-20px" }}
          text={product.brand}
          color="pink"
        />
        <Badge.Ribbon
          style={{ position: "absolute", top: "-200px", left: "-20px" }}
          text={product.category}
          color="pink"
        />
      </Flex>
      <h4 style={{ WebkitLineClamp: 2 }}>{product.title}</h4>
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
