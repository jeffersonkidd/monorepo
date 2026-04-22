import { addons } from "storybook/manager-api";
import "../src/index.css";
import "../src/styles/theme.css";
import theme from "./theme";

addons.setConfig({
  theme: theme,
});
