import { FC, useEffect } from "react";

import { login } from "../store/authSlice";
import { setAccount } from "../store/accountSlice";
import { getLocaleAccount } from "../app/browser-api";
import useAppDispatch from "../hooks/useAppDispatch";

const LocaleAccountProvider: FC = function (props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedAccount = getLocaleAccount();

    if (savedAccount) {
      dispatch(login({ token: savedAccount.token }));
      dispatch(
        setAccount({
          id: savedAccount.accountId,
          role: savedAccount.accountRole,
        })
      );
    }
  }, [dispatch]);
  return <>{props.children}</>;
};

export default LocaleAccountProvider;
