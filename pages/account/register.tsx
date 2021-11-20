import { useRouter } from "next/router";

import axios from "axios";

import { login } from "../../app/authSlice";
import { setUser } from "../../app/userSlice";
import { useAppDispatch } from "../../app/hooks";
import type { NextPageWithLayout } from "../_app";
import RegisterForm from "../../components/RegisterForm";

const RegisterPage: NextPageWithLayout = function () {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const registerHandler = (newAccountData: any) => {
    // console.log(newUserAccount);

    axios
      .post("/api/account", newAccountData)
      .then((response) => {
        if (response.status === 200) {
          const { token, id: userId } = response.data;
          const userRole = newAccountData.role;

          dispatch(login({ token }));
          dispatch(setUser({ userId, userRole }));

          alert("User registered successfully");
          router.replace(`/${userRole}/${userId}/dashboard`);
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <main className="page">
      <div className="container">
        <section>
          <span className="block pb-3 text-center font-bold text-4xl">
            Robt
          </span>
          <RegisterForm onRegister={registerHandler} />
        </section>
      </div>
    </main>
  );
};

export default RegisterPage;
