import { useRouter } from "next/router";
import Link from "next/link";

import axios from "axios";

import { login } from "../../store/authSlice";
import { setAccount } from "../../store/accountSlice";
import useAppDispatch from "../../hooks/useAppDispatch";
import type { NextPageWithLayout } from "../_app";
import RegisterForm from "../../components/RegisterForm";
import { saveAccountLocally } from "../../app/browser-api";

const RegisterPage: NextPageWithLayout<any> = function () {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const registerHandler = (newAccountData: any): void => {
    axios
      .post("/api/account", newAccountData)
      .then(response => {
        if (response.data.ok) {
          const { token, id: accountId } = response.data;
          const accountRole = newAccountData.role;

          dispatch(login({ token }));
          dispatch(setAccount({ id: accountId, role: accountRole }));
          saveAccountLocally({ token, accountId, accountRole });

          alert("ACCOUNT REGISTRERED SUCCESSFULLY");
          router.replace(`/${accountRole}/${accountId}/dashboard`);
        } else {
          alert(response.data.info);
        }
      })
      .catch((e: any) => {
        console.log(e.message);
      });
  };

  return (
    <main className="page-content">
      <section className="flex flex-col items-center py-8">
        <span className="mb-3 text-center font-bold text-4xl">
          <Link href="/jobs">Robt</Link>
        </span>
        <RegisterForm onRegister={registerHandler} />
      </section>
    </main>
  );
};

export default RegisterPage;
