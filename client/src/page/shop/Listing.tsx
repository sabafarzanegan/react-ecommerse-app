import { useQuery } from "@tanstack/react-query";
import FilterCheckbox from "../../components/shop/listing/Checkbox";
import "../../components/shop/listing/listing.css";

import ProductListing from "../../components/shop/listing/ProductListing";
import { Button, Drawer, Skeleton } from "antd";
import { Suspense, useState } from "react";
import { Productstore } from "../../store/admin/Productstore";

function Listing() {
  const [open, setOpen] = useState(false);
  const { fetchAllProduct } = Productstore((state) => state);
  const { data } = useQuery({
    queryKey: ["fetchAllProduct"],
    queryFn: fetchAllProduct,
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}>
        <div>
          <Button
            style={{ alignSelf: "start" }}
            color="default"
            type="dashed"
            onClick={() => setOpen(true)}>
            اعمال فیلتر
          </Button>
          <Drawer
            style={{ scrollbarColor: "#531dab" }}
            title="اعمال فیلتر"
            onClose={() => setOpen(false)}
            open={open}>
            <FilterCheckbox />
          </Drawer>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0px 10px",
            fontWeight: 500,
          }}></div>
      </div>
      <Suspense fallback={<Skeleton active />}>
        <ProductListing filteredProduct={data} />
      </Suspense>
    </div>
  );
}

export default Listing;
