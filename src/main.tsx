import ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import GlobalStyles from "@mui/material/GlobalStyles";

import { App } from "./App";
import theme from "./theme";
import { GlobalStyle } from "./global-style.style";
import { SocketProvider } from "./contexts/SocketContext.contexts";

const cacheRtl = createCache({
  key: "muirtl",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <SocketProvider>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <GlobalStyles styles={GlobalStyle} />
          <CssBaseline />
          <App />
        </ThemeProvider>
      </CacheProvider>
    </SocketProvider>
  </>
);
