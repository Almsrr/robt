import { FC } from "react";

import { useRouter } from "next/router";

import { useAppDispatch } from "../../app/hooks";
import { loginUser } from "../../app/authSlice";
import axios from "axios";
import LoginForm from "../../components/LoginForm";

const LoginPage: FC = function () {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const loginHandler = (email: string, password: string) => {
    axios
      .post("/api/login", { email, password })
      .then((response) => {
        dispatch(loginUser(response.data));
        router.push("/jobs");
      })
      .catch(() => {
        alert("Something went wrong, please try again");
      });
  };

  return (
    <main>
      <section>
        <div className="container">
          <div className="flex justify-center w-full flex-col h-screen">
            <h1 className="font-bold text-3xl text-center pb-3">Robt</h1>
            <LoginForm onLogin={loginHandler} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
