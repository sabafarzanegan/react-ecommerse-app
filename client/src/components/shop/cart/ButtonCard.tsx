import { Button } from "antd";
import { Product } from "../../../utils/Type";
import { ShopCart } from "../../../store/user/ShopCart";
import { Authstore } from "../../../store/admin/Authstore";
interface Props {
  product: Product | undefined;
}
function ButtonCard({ product }: Props) {
  const { addToCart, updateCart, isLoading, Cart } = ShopCart((state) => state);
  const isProductLoading = product
    ? isLoading[product._id] || false
    : undefined;
  const { user } = Authstore((state) => state);
  const findProduct = Cart.find(
    (product1) => product1.productId === product?._id
  );
  console.log(findProduct);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10px",
        gap: "0px 3px",
      }}>
      {findProduct && (
        <Button
          variant="solid"
          style={{
            fontWeight: 500,
          }}
          onClick={() =>
            updateCart({
              userId: user?.id,
              productId: product?._id,
              quantity: findProduct?.quantity ? findProduct.quantity + 1 : 1,
            })
          }
          disabled={isProductLoading}>
          +
        </Button>
      )}

      <Button
        onClick={() => {
          addToCart({
            userId: user?.id,
            productId: product?._id,
            quantity: findProduct?.quantity ? findProduct.quantity + 1 : 1,
          });
        }}
        variant="solid"
        disabled={isProductLoading}
        color="primary"
        style={{ width: "100%" }}>
        {findProduct ? findProduct.quantity : "افزودن به سبد خرید"}
      </Button>

      {findProduct && (
        <Button
          style={{ fontWeight: 500 }}
          onClick={() =>
            updateCart({
              userId: user?.id,
              productId: product?._id,
              quantity: findProduct?.quantity ? findProduct.quantity - 1 : 0,
            })
          }
          disabled={isProductLoading}>
          -
        </Button>
      )}
    </div>
  );
}

export default ButtonCard;
