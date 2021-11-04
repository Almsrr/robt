import { FC, Fragment } from "react";

import Navigation from "./Navigation/Navigation";

const Layout: FC = function (props) {
  return (
    <Fragment>
      <Navigation />
      {props.children}
      <footer>
        <div className="container">&copy; 2021 Robt</div>
      </footer>
    </Fragment>
  );
};

export default Layout;
