import { AppProps } from "next/app";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "@/app/globals.css";
import "reset-css";
import "static/fonts/din/global.css";
import { Provider } from "react-redux";
import store from "@/services/store";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import { IHeader } from "@/services/interface";
import { LayoutProvider } from "@/context/LayoutContext";
import { SearchProvider } from "@/context/SearchContext";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

function MyApp({ Component, pageProps }: AppProps & { headerData: IHeader }) {
  return (
    <Provider store={store}>
      <GoogleReCaptchaProvider
        reCaptchaKey="6Les_BgpAAAAAA1GKcqKQBCwRTEJgpIZHln5ro9z"
        scriptProps={{
          async: false,
          defer: false,
          appendTo: "head",
          nonce: undefined,
        }}
        container={{
          element: "captcha",
          parameters: {
            theme: undefined,
          },
        }}
      >
        <I18nextProvider i18n={i18n}>
          <LayoutProvider>
            <SearchProvider>
              <Header />
              <div className="h-[86px] md:h-[156px]" />
              <Component {...pageProps} />
              <Footer />
            </SearchProvider>
          </LayoutProvider>
        </I18nextProvider>
      </GoogleReCaptchaProvider>
    </Provider>
  );
}

export default MyApp;
