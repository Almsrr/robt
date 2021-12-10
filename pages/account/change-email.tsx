import { useRouter } from "next/router";

import { FormEvent, ReactElement, useRef } from "react";

import { NextPageWithLayout } from "../_app";
import Layout from "../../components/UI/Layout";
import axios from "axios";

const ChangeEmailPage: NextPageWithLayout = function () {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { accountId, email, role } = router.query;

  const saveEmailHandler = (event: FormEvent) => {
    event.preventDefault();

    const newEmail = emailRef.current!.value;
    const password = passwordRef.current!.value;

    if (newEmail.length === 0) return;
    if (password.length === 0) return;

    const url = `/api/account/${accountId}`;
    axios
      .put(url, { newEmail, password })
      .then((response) => {
        if (response.data.ok) {
          alert("Email updated successfully");
          goToProfile();
        } else {
          alert(response.data.info);
        }
      })
      .catch((error: any) => {
        console.log(error.message);
      });
  };

  const goToProfile = () => {
    router.push(`/${role}/${accountId}`);
  };

  return (
    <main>
      <section className="flex flex-col items-center py-8">
        <div className="max-w-xl border border-gray-300 rounded-md p-4">
          <header>
            <h1 className="font-bold text-2xl">Changing email for {email}</h1>
          </header>
          <form className="py-6" onSubmit={saveEmailHandler}>
            <div className="form-row mb-4">
              <label htmlFor="email" className="font-bold text-lg pb-2">
                New email address
              </label>
              <input
                type="email"
                id="email"
                className="border border-black rounded-lg block w-full p-2"
                ref={emailRef}
              />
            </div>
            <div className="form-row mb-4">
              <label htmlFor="password" className="font-bold text-lg pb-2">
                Current password
              </label>
              <input
                type="password"
                id="password"
                className="border border-black rounded-lg block w-full p-2"
                ref={passwordRef}
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-black text-white rounded-full font-bold py-3 px-6"
              >
                Save email
              </button>
              <button className="font-bold py-3 px-6" onClick={goToProfile}>
                Cancel change
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

ChangeEmailPage.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ChangeEmailPage;
