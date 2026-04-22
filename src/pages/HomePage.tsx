import { FAQs } from "../examples/FAQs";
import { PanelSections } from "../examples/PanelSections";
import { PricingGrid } from "../examples/PricingGrid";
import { ProductDetails } from "../examples/ProductDetails";
import { ProductGrid } from "../examples/ProductGrid";
import { WelcomeHero } from "../examples/WelcomeHero";

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
