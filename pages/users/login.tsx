import { FC } from "react";

import { useRouter } from "next/router";

import { useAppDispatch } from "../../app/hooks";
import { login } from "../../app/authSlice";
import axios from "axios";
import LoginForm from "../../components/LoginForm";

const LoginPage: FC = function () {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const loginHandler = (email: string, password: string) => {
    axios
      .post("/api/users/login", { email, password })
      .then((response) => {
        const { success, token, id: userId } = response.data;

        if (success) {
          dispatch(login({ token, userId }));
          router.push(`/users/${userId}/dashboard`);
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
