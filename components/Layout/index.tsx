import { FC } from "react";
import styled from "styled-components";

import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useAppDispatch";
import { Navbar } from "./Nabvar";
import { Footer } from "./Footer";
import { Chat } from "./Chat";
import { hideMenu } from "../../store/menu-slice";

export const Layout: FC = ({ children }) => {
  const { auth: isAuth, menu } = useAppSelector(state => state);
  const dispatch = useAppDispatch();

  const menuHandler = () => {
    if (menu) {
      dispatch(hideMenu());
      return;
    }
  };

  return (
    <div onClick={menuHandler}>
      <Navbar />
      <PageContent>{children}</PageContent>
      {isAuth && <Chat />}
      <Footer />
    </div>
  );
};

const PageContent = styled.main`
  min-height: 100vh;
  width: 100vw;
`;
