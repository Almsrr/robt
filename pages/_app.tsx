import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { Provider } from "react-redux";
import store from "../app/store";

//New type that add getLayout property to pages
export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

/*New type that overide the type of component in AppProps.
NextPageWithLayout type instead of NextPage*/
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getPage = () => {
    //Choose which page should be rendered
    const componentToRender = Component.getLayout ?? ((page) => page);

    return (
      <Provider store={store}>
        {componentToRender(<Component {...pageProps} />)}
      </Provider>
    );
  };

  return getPage();
}

export default MyApp;
