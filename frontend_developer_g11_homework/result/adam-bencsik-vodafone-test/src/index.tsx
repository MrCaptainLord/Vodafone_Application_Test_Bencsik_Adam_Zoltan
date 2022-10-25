import { ThemeProvider } from "@material-ui/core";
import i18next from "i18next";
import { SnackbarProvider } from "notistack";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import LayoutLoading from "./components/Layout/LayoutLoading";
import "./i18n.js";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import theme from "./shared/common/constants";
import queryClient from "./shared/common/query";

i18next.init({
  interpolation: { escapeValue: false },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider>
            <Suspense fallback={<LayoutLoading />}>
              <I18nextProvider i18n={i18next}>
                <App />
              </I18nextProvider>
            </Suspense>
          </SnackbarProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
