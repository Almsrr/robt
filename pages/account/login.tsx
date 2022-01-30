import { useRouter } from "next/router";
import Link from "next/link";

import axios from "axios";
import useAppDispatch from "../../hooks/useAppDispatch";
import { login } from "../../store/authSlice";
import { setAccount } from "../../store/accountSlice";
import type { NextPageWithLayout } from "../_app";
import LoginForm from "../../components/LoginForm";
import { saveAccountLocally } from "../../app/browser-api";

const LoginPage: NextPageWithLayout<any> = function () {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const loginHandler = (email: string, password: string) => {
    axios
      .post("/api/account/login", { email, password })
      .then(response => {
        const {
          success,
          token,
          id: accountId,
          role: accountRole,
          info,
        } = response.data;

        if (success) {
          dispatch(login({ token }));
          dispatch(setAccount({ id: accountId, role: accountRole }));
          saveAccountLocally({ token, accountId, accountRole });

          router.replace(`/${accountRole}/${accountId}/dashboard`);
        } else {
          alert(info);
        }
      })
      .catch((error: any) => {
        console.log(error.message);
      });
  };

  return (
    <main className="page-content">
      <section className="flex flex-col items-center py-8 ">
        <span className="mb-3 text-center font-bold text-4xl">
          <Link href="/jobs">Robt</Link>
        </span>
        <LoginForm onLogin={loginHandler} />
      </section>
    </main>
  );
};

export default LoginPage;
