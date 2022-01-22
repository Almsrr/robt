import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect } from "react";
import type { NextPage } from "next";

import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { Provider } from "react-redux";
import store from "../store/index";
import LocaleAccountProvider from "../components/LocaleAccountProvider";

//New type that add getLayout property to pages
export type NextPageWithLayout<P> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

/*New type that overide the type of component in AppProps.
NextPageWithLayout type instead of NextPage*/
type AppPropsWithLayout<P> = AppProps<P> & {
  Component: NextPageWithLayout<P>;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout<any>) {
  const getPage = () => {
    //Choose which page should be rendered
    const componentToRender = Component.getLayout ?? ((page) => page);

    return (
      <Provider store={store}>
        <LocaleAccountProvider>
          {componentToRender(<Component {...pageProps} />)}
        </LocaleAccountProvider>
      </Provider>
    );
  };

  return getPage();
}

export default MyApp;
