import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState, ReactNode } from "react";

import type { NextPageWithLayout } from "../../_app";
import Layout from "../../../components/UI/Layout";
import axios from "axios";
import Resume from "../../../components/JobSeeker/Resume";
import ContactInformation from "../../../components/JobSeeker/ContactInformation";
import Spinner from "../../../components/UI/Spinner/Spinner";

interface Account {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

const ProfilePage: NextPageWithLayout = function () {
  const [account, setAccount] = useState<Account>({
    id: "",
    email: "",
    role: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [inPreviewMode, setInPreviewMode] = useState<boolean>(true);
  const router = useRouter();

  const fullName =
    account.firstName && account.lastName
      ? `${account.firstName} ${account.lastName}`
      : "Your name";

  const togglePreviewHandler = (): void => {
    setInPreviewMode((prevState) => !prevState);
  };

  const saveInfoHandler = (firstName: string, lastName: string): void => {
    setIsLoading(true);
    axios
      .put("/api/account/update-names", {
        accountId: account.id,
        firstName,
        lastName,
      })
      .then((response) => {
        if (response.data.ok) {
          alert("Information updated successfully!");

          setInPreviewMode(true);
          setAccount({ ...account, firstName, lastName });
        } else {
          alert(response.data.info);
        }
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const id = router.query.accountId ?? false;

    if (id) {
      const url = `/api/account/${id}`;
      axios
        .get(url)
        .then((response) => {
          const fetchedAccount = response.data;
          // console.log(response.data);

          const currentAccount: Account = {
            id: fetchedAccount.id,
            email: fetchedAccount.email,
            role: fetchedAccount.role,
            firstName: fetchedAccount.firstName,
            lastName: fetchedAccount.lastName,
            phoneNumber: fetchedAccount.phoneNumber,
          };

          setAccount(currentAccount);
        })
        .catch((error) => {
          console.log(error);
          alert("Something went wrong");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [router]);

  return (
    <main className="flex flex-col items-center py-8">
      <div className="w-full max-w-xl">
        <header className="mb-5 flex items-center">
          <Image
            src="/download.png"
            alt="user-profile-picture"
            width={100}
            height={100}
          />
          <div className="ml-4">
            {isLoading ? (
              <Spinner />
            ) : (
              <h2 className="font-bold text-4xl">{fullName}</h2>
            )}
          </div>
        </header>
        <Resume />
        <ContactInformation
          id={account.id}
          firstName={account.firstName}
          lastName={account.lastName}
          fullName={fullName}
          email={account.email}
          role={account.role}
          phoneNumber={account.phoneNumber}
          inPreview={inPreviewMode}
          onTogglePreview={togglePreviewHandler}
          onSave={saveInfoHandler}
        />
        <section className="border border-gray-300 rounded-md p-3">
          <header className="flex justify-between mb-4">
            <h2 className="font-bold text-lg">Jobs preferences</h2>
            <button title="edit" type="button" className="px-2 text-md">
              <i className="fas fa-edit"></i>
            </button>
          </header>
          <div className="pb-5 text-gray-500">
            <p className="text-sm">
              Save specific details like desired pay and schedule that help us
              match you with better jobs
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

ProfilePage.getLayout = (page: ReactElement): ReactNode => {
  return <Layout>{page}</Layout>;
};

export default ProfilePage;
