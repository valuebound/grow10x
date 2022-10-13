import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.dark.less";
import "antd/dist/antd.less";
import "react-loading-skeleton/dist/skeleton.css";
import { ConfigProvider } from "antd"
import { AnimatedRoutes } from "./components";
import { theme } from "./utils/theme";
import { validateMessages } from "./utils/constants";

function App() {
  
  ConfigProvider.config({
    theme: {
      primaryColor: theme.primary,
      infoColor: theme.info,
    },
  })
  return (
    <ConfigProvider form={{validateMessages}}>
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
