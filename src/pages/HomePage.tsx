
import { WelcomeHero } from "../examples/WelcomeHero";
import { PanelSections } from "../examples/PanelSections";
import { Demo } from "../examples/Demo";
import { Header, Footer } from "compositions";
import { ProductDetails } from "../examples/ProductDetails"; 
import { PricingGrid } from "../examples/PricingGrid";
import { ProductGrid } from "../examples/ProductGrid";

export function HomePage() {
  return (
    <>
    <Header />
    <WelcomeHero />
    <Demo />
    <PanelSections />
    <ProductDetails />
    <PricingGrid />
    <ProductGrid />
    <Footer />
    </>
  );
}
