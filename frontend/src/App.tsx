import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.dark.less";
import "antd/dist/antd.less";
import "react-loading-skeleton/dist/skeleton.css";
import { ConfigProvider } from "antd";
import { AnimatedRoutes } from "./components";
import { theme } from "./utils/theme";
import { validateMessages } from "./utils/constants";
import { GoogleOAuthProvider } from "@react-oauth/google";
function App() {
  ConfigProvider.config({
    theme: {
      primaryColor: theme.primary,
      infoColor: theme.info,
    },
  });
  return (
    <ConfigProvider form={{ validateMessages }}>
      <BrowserRouter>
        <GoogleOAuthProvider clientId="176331006924-vbl614mp8bhq1sa70nasrudou42se9ah.apps.googleusercontent.com">
          <AnimatedRoutes />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
