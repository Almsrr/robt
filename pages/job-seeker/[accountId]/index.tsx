import Image from "next/image";
import { useRouter } from "next/router";

import { ReactElement, useEffect, useState } from "react";

import type { NextPageWithLayout } from "../../_app";
import Layout from "../../../components/UI/Layout";
import axios from "axios";
import Resume from "../../../components/Resume";
import ContactInformation from "../../../components/ContactInformation";
import Spinner from "../../../components/UI/Spinner/Spinner";

interface AccountInfo {
  id: string;
  email: string;
  role: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string;
}

const Profilepage: NextPageWithLayout = function () {
  const [account, setAccount] = useState<AccountInfo>({
    id: "",
    email: "",
    role: "",
    firstName: null,
    lastName: null,
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  let userAccountName: string;
  if (account.firstName && account.lastName) {
    userAccountName = `${account.firstName} ${account.lastName}`;
  } else {
    userAccountName = "Your name";
  }

  const saveInformationHandler = (firstName: string, lastName: string) => {
    const url = `/api/account/${account.id}`;

    axios.post(url, { firstName, lastName }).then((response) => {
      alert("Information updated successfully!");
    });
  };

  useEffect(() => {
    const id = router.query.accountId;
    const url = `/api/account/${id}`;
    axios
      .get(url)
      .then((response) => {
        const fetchedAccount = response.data;
        // console.log(response.data);

        const currentAccount: AccountInfo = {
          id: fetchedAccount.accountId,
          email: fetchedAccount.email,
          role: fetchedAccount.role,
          firstName: fetchedAccount.firstName,
          lastName: fetchedAccount.lastName,
          phoneNumber: "",
        };

        //Validations

        setAccount(currentAccount);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [router]);

  return (
    <>
      <main className="max-w-xl mx-auto mt-8">
        <header className="pb-5">
          <div className="flex items-center">
            <Image
              src="/download.png"
              alt="user-profile-picture"
              width={100}
              height={100}
            />
            <div className="ml-4">
              {isLoading && (
                <h2 className="font-bold text-4xl">
                  <Spinner />
                </h2>
              )}
              {!isLoading && (
                <>
                  <h2 className="font-bold text-4xl">{userAccountName}</h2>
                  <p>Santo Domingo, DR</p>
                </>
              )}
            </div>
          </div>
        </header>
        <section>
          <Resume />
          <ContactInformation
            firstName={account.firstName}
            lastName={account.lastName}
            email={account.email}
            phoneNumber={account.phoneNumber}
            onSave={saveInformationHandler}
          />

          <section className="border border-gray-300 rounded-md p-3">
            <header>
              <div className="flex justify-between mb-4">
                <h2 className="font-bold text-lg">Jobs preferences</h2>
                <button type="button" className="px-2 text-md">
                  <i className="fas fa-edit"></i>
                </button>
              </div>
            </header>
            <div className="pb-5 text-gray-500">
              <p className="text-sm">
                Save specific details like desired pay and schedule that help us
                match you with better jobs
              </p>
            </div>
          </section>
        </section>
      </main>
    </>
  );
};

Profilepage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Profilepage;
