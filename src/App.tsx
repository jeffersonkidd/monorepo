import { AllProviders } from "data";
import { BlankTemplate } from "templates";
import { Header, Footer } from "compositions";
import { TextHeading, Text } from "primitives";

function App() {
  return (
    <AllProviders>
        <BlankTemplate
          header={<Header />}
          footer={<Footer />}
          id="dashboard-page"
          mainProps={{ "aria-label": "Dashboard content" }}
        >
          <TextHeading>Overview</TextHeading>
          <Text>Welcome to your dashboard.</Text>
        </BlankTemplate>
    </AllProviders>
  );
}

export default App;
