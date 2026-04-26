
import { WelcomeHero } from "examples";
import { PanelSections } from "examples";
import { Demo } from "examples";
import { Header, Footer } from "compositions";
import { ProductDetails } from "examples"; 
import { PricingGrid } from "examples";
import { ProductGrid } from "examples";

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
