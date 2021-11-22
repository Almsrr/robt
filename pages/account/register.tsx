import { useRouter } from "next/router";

import axios from "axios";

import { login } from "../../store/authSlice";
import { setAccount } from "../../store/accountSlice";
import useAppDispatch from "../../hooks/useAppDispatch";
import type { NextPageWithLayout } from "../_app";
import RegisterForm from "../../components/RegisterForm";
import { saveAccountLocally } from "../../app/locale-functions";

const RegisterPage: NextPageWithLayout = function () {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const registerHandler = (newAccountData: any) => {
    // console.log(newUserAccount);

    axios
      .post("/api/account", newAccountData)
      .then((response) => {
        if (response.status === 200) {
          const { token, id: accountId } = response.data;
          const accountRole = newAccountData.role;

          dispatch(login({ token }));
          dispatch(setAccount({ id: accountId, role: accountRole }));
          saveAccountLocally({ token, accountId, accountRole });

          alert("Account registered successfully");
          router.replace(`/${accountRole}/${accountId}/dashboard`);
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
