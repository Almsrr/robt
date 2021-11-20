import { FC } from "react";

import { useAppSelector } from "../../app/hooks";
import Navigation from "./Navigation/Navigation";
import Footer from "./Footer/Footer";
import ChatBox from "../Chat/ChatBox";

const Layout: FC = function (props) {
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <>
      <Navigation />
      {props.children}
      {isAuth && <ChatBox />}
      <Footer />
    </>
  );
};

export default Layout;
