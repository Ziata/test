import { AppProps } from "next/app";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "@/app/globals.css";
import "reset-css";
import "static/fonts/D-DIN/stylesheet.css";
import { Provider } from "react-redux";
import store from "@/services/store";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import { IHeader } from "@/services/interface";
import { LayoutProvider } from "@/context/LayoutContext";
import { SearchProvider } from "@/context/SearchContext";

function MyApp({ Component, pageProps }: AppProps & { headerData: IHeader }) {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default MyApp;
