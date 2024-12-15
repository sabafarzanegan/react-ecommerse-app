import { Button } from "antd";
import { Product } from "../../../utils/Type";
import { ShopCart } from "../../../store/user/ShopCart";
import { Authstore } from "../../../store/admin/Authstore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Props {
  product: Product | undefined;
}
function ButtonCard({ product }: Props) {
  const { addToCart, updateCart, isLoading, fetchToCart } = ShopCart(
    (state) => state
  );
  const { user } = Authstore((state) => state);
  const queryClient = useQueryClient();
  const { data: Cart } = useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchToCart(user?.id),
  });
  const isProductLoading = product
    ? isLoading[product._id] || false
    : undefined;
  const findProduct =
    Cart && Cart?.find((product1) => product1.productId === product?._id);
  const { mutate } = useMutation({
    mutationKey: ["addcart"],
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });
  const { mutate: updateMutate } = useMutation({
    mutationKey: ["updatecart"],
    mutationFn: updateCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });
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
            updateMutate({
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
          mutate({
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
            updateMutate({
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
