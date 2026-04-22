import { FAQs } from "./src/examples/FAQs";
import { PanelSections } from "./src/examples/PanelSections";
import { PricingGrid } from "./src/examples/PricingGrid";
import { ProductDetails } from "./src/examples/ProductDetails";
import { ProductGrid } from "./src/examples/ProductGrid";
import { WelcomeHero } from "./src/examples/WelcomeHero";

function HomePage() {
  return (
    <>
      <WelcomeHero />
      <PanelSections />
      <PricingGrid />
      <FAQs />
      <ProductDetails />
      <ProductGrid />
    </>
  );
}

export default HomePage;
