import React, { FC, useState } from "react";

type authContextType = {
  token: string;
  isAuth: boolean;
  username: string;
  login: (username: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
};

export const AuthContext = React.createContext<authContextType>({
  token: "",
  isAuth: false,
  username: "",
  login: () => {
    return new Promise(() => {});
  },
  logout: async () => {
    return new Promise(() => {});
  },
});

const AuthContextProvider: FC = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  const loginHandler = async (username: string) => {
    let success = true;

    try {
      setIsAuthenticated(true);
      setUsername(username);
    } catch (e) {
      success = false;
    } finally {
      return success;
    }
  };
  const logoutHandler = async () => {
    let success = true;

    try {
      setIsAuthenticated(false);
      setUsername("");
    } catch (e) {
      success = false;
    } finally {
      return success;
    }
  };

  const contextValue: authContextType = {
    token: "",
    isAuth: isAuthenticated,
    username: username,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
