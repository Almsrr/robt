import type { AppProps } from "next/app";
import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AuthContextProvider from "../store/auth-context";
import { Provider } from "react-redux";
import store from "../app/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </Provider>
  );
}

export default MyApp;
