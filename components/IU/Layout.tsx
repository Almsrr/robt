import { FC, Fragment } from "react";

import Navigation from "./Navigation/Navigation";

const Layout: FC = function (props) {
  return (
    <Fragment>
      <Navigation />
      {props.children}
      <footer>&copy; 2021 Robt</footer>
    </Fragment>
  );
};

export default Layout;
