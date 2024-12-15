import Categorysection from "../../components/shop/shoppinghome/Categorysection";
import MainCarosel from "../../components/shop/shoppinghome/MainCarosel";
import FeaturedSection from "../../components/shop/shoppinghome/FeaturedSection";
import BrandSection from "../../components/shop/shoppinghome/BrandSection";

const container: React.CSSProperties = {
  width: "100%",

  display: "flex",
  flexDirection: "column",
};

function Shoppinghome() {
  return (
    <section style={container}>
      <MainCarosel />
      <Categorysection />
      <FeaturedSection />
      <BrandSection />
    </section>
  );
}

export default Shoppinghome;
