import { FC, Fragment, useContext, useState } from "react";

import Navigation from "./Navigation/Navigation";
import { AuthContext } from "../../store/auth-context";

const Layout: FC = function (props) {
  const authCtx = useContext(AuthContext);
  const [showMessages, setShowMessages] = useState(false);

  const toggleChat = () => {
    setShowMessages((prevState) => !prevState);
  };

  const chat = (
    <div className="w-64 rouded fixed bottom-0 right-10 rounded-t-md overflow-hidden">
      <header
        className="bg-black text-white cursor-pointer"
        onClick={toggleChat}
      >
        <h4 className="p-3 font-bold">Messages</h4>
      </header>
      {showMessages && (
        <main className="border">
          <section className="p-2">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae
              ipsam accusantium ea nam, incidunt doloremque repellendus earum
              repudiandae enim tenetur aperiam nobis libero magnam impedit ipsum
              ducimus inventore rem sequi?
            </p>
          </section>
        </main>
      )}
    </div>
  );

  return (
    <Fragment>
      <Navigation />
      {props.children}
      <footer>
        <div className="container">&copy; 2021 Robt</div>
      </footer>
      {authCtx.isAuth && chat}
    </Fragment>
  );
};

export default Layout;
