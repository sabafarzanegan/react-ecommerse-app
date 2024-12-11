import { Flex, Pagination } from "antd";
import { Product } from "../../../utils/Type";
import ProductCard from "../productCard";
import "../shop.css";
import { useState } from "react";

function ProductListing({
  filteredProduct,
}: {
  filteredProduct: Product[] | undefined;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProduct?.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Flex
        wrap
        style={{ width: "100%", marginTop: "10px" }}
        gap="small"
        justify="space-between"
        align="center">
        {currentProducts?.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </Flex>

      <div style={{ width: "100%", display: "flex", alignItems: "center " }}>
        <Pagination
          style={{ display: "block", marginTop: "40px", width: "100%" }}
          current={currentPage}
          total={filteredProduct?.length}
          pageSize={productsPerPage}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default ProductListing;
