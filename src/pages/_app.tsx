import { AppProps } from "next/app";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "@/app/globals.css";
import "reset-css";
import "static/fonts/D-DIN/stylesheet.css";
import { Provider } from "react-redux";
import store from "@/services/store";
import { LanguageProvider } from "@/context/LanguageContext";
import { PostProvider } from "@/context/PostContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <Provider store={store}>
        <PostProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </PostProvider>
      </Provider>
    </LanguageProvider>
  );
}

export default MyApp;
