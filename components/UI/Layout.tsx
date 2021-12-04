import { FC } from "react";

import useAppSelector from "../../hooks/useAppSelector";
import Navigation from "./Navigation/Navigation";
import Footer from "./Footer/Footer";
import ChatBox from "../Chat/ChatBox";

const Layout: FC = function (props) {
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <>
      <Navigation />
      <div className="page-content">{props.children}</div>
      {isAuth && <ChatBox />}
      <Footer />
    </>
  );
};

export default Layout;
