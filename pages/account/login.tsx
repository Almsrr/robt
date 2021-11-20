import { useRouter } from "next/router";

import axios from "axios";

import { useAppDispatch } from "../../app/hooks";
import { login } from "../../app/authSlice";
import { setUser } from "../../app/userSlice";
import type { NextPageWithLayout } from "../_app";
import LoginForm from "../../components/LoginForm";

const LoginPage: NextPageWithLayout = function () {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const loginHandler = (email: string, password: string) => {
    axios
      .post("/api/account/login", { email, password })
      .then((response) => {
        const { success, token, id: userId, role: userRole } = response.data;

        if (success) {
          dispatch(login({ token }));
          dispatch(setUser({ userId, userRole }));

          router.replace(`/${userRole}/${userId}/dashboard`);
        }
      })
      .catch(() => {
        alert("Something went wrong, please try again");
      });
  };

  return (
    <main className="page">
      <div className="container">
        <section>
          <span className="block pb-3 text-center font-bold text-4xl">
            Robt
          </span>
          <LoginForm onLogin={loginHandler} />
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
