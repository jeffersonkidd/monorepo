import { AllProviders } from "data";
import { OverviewPage } from "pages/OverviewPage.tsx";

function App() {
  return (
    <AllProviders>
      <OverviewPage />
    </AllProviders>
  );
}

export default App;