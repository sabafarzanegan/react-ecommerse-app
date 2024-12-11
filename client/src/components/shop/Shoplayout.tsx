import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";

function Shoplayout() {
  return (
    <>
      <Navbar />
      <div style={{ padding: "20px 0px" }}>
        <Outlet />
      </div>
    </>
  );
}

export default Shoplayout;
