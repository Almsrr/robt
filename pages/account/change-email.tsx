import { useRouter } from "next/router";
import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  ReactNode,
  useState,
} from "react";
import { GetServerSideProps } from "next";

import { NextPageWithLayout } from "../_app";
import Layout from "../../components/UI/Layout";
import axios from "axios";
import { getAccountBy, AccountData } from "../../app/db-api";

const ChangeEmailPage: NextPageWithLayout<{ account?: AccountData }> =
  function (props) {
    const [enteredbNewEmail, setEnteredNewEmail] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const router = useRouter();

    const id = props.account?.id || "";
    const role = props.account?.role || "";
    const email = props.account?.email || "account";

    const newEmailHandler = (e: ChangeEvent<HTMLInputElement>): void => {
      setEnteredNewEmail(e.target.value);
    };

    const passwordHandler = (e: ChangeEvent<HTMLInputElement>): void => {
      setEnteredPassword(e.target.value);
    };

    const saveEmailHandler = (event: FormEvent): void => {
      event.preventDefault();

      if (enteredbNewEmail.length === 0) return;
      if (enteredPassword.length === 0) return;

      const url = `/api/account/${id}`;
      axios
        .put(url, { newEmail: enteredbNewEmail, password: enteredPassword })
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

    const goToProfile = (): void => {
      router.push(`/${role}/${id}`);
    };

    return (
      <main className="py-8">
        <section className="flex flex-col items-center">
          <div className="max-w-xl border border-gray-300 rounded-md p-4">
            <header className="mb-6">
              <h1 className="font-bold text-2xl">Changing email for {email}</h1>
            </header>
            <form className="pb-6" onSubmit={saveEmailHandler}>
              <div className="form-row mb-4">
                <label htmlFor="email" className="font-bold text-lg pb-2">
                  New email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="border border-black rounded-lg block w-full p-2"
                  value={enteredbNewEmail}
                  onChange={newEmailHandler}
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
                  value={enteredPassword}
                  onChange={passwordHandler}
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

ChangeEmailPage.getLayout = function (page: ReactElement): ReactNode {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<{
  account: AccountData | null;
}> = async function (context) {
  const { accountId } = context.query;

  if (accountId) {
    return {
      props: {
        account: await getAccountBy("id", accountId.toString()),
      },
    };
  }

  return {
    props: {
      account: null,
    },
  };
};

export default ChangeEmailPage;
