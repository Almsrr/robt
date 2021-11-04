import type { AppProps } from "next/app";
import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AuthContextProvider from "../store/auth-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp;
