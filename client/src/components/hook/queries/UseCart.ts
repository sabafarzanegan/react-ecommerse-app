import { useQueryClient } from "@tanstack/react-query";

export const useInvalidateCart = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries(["cart"]);
};
