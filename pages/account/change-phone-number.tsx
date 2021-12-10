import { useRouter } from "next/router";

import { FormEvent, ReactElement, useRef, useState } from "react";

import { NextPageWithLayout } from "../_app";
import Layout from "../../components/UI/Layout";
import axios from "axios";
import PhoneNumberForm from "../../components/PhoneNumber/PhoneNumberForm";
import PhoneNumberCodeInput from "../../components/PhoneNumber/PhoneNumberCodeInput";

interface actionData {
  phoneNumber: string;
  password: string;
}

const ChangePhoneNumberPage: NextPageWithLayout = function () {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isWaitingCode, setIsWaitingCode] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  const router = useRouter();
  const { accountId, role } = router.query;

  const changeCountryCodeHandler = (countryCode: string) => {
    setCountryCode(countryCode);
  };
  const changePhoneNumberHandler = (phoneNumber: string) => {
    setPhoneNumber(phoneNumber);
  };
  const submitPhoneNumberHandler = () => {
    if (countryCode.length === 0) return;
    if (phoneNumber.length === 0) return;
    setIsWaitingCode(true);
  };

  const goToProfile = () => {
    router.push(`/${role}/${accountId}`);
  };

  const codeReceivedHandler = () => {
    setIsAuthenticating(true);
  };

  const cancelCodeWaiting = () => {
    setIsWaitingCode(false);
  };

  const updateAccountPhoneNumber = (event: FormEvent) => {
    event.preventDefault();

    const url = `/api/account/update-phone`;
    const completePhoneNumber = `${countryCode} ${phoneNumber}`;
    const data = { accountId, password, newPhoneNumber: completePhoneNumber };
    axios
      .put(url, data)
      .then((response) => {
        if (response.data.ok) {
          alert("Phone number saved successfully");
          goToProfile();
        } else {
          alert(response.data.info);
        }
      })
      .catch((error: any) => {
        console.log(error.message);
      });
  };
  let viewContent;
  if (isAuthenticating) {
    viewContent = (
      <div className="w-full max-w-md border border-gray-300 rounded-md p-4">
        <header>
          <h1 className="font-bold text-2xl mb-1">One last step</h1>
          <p className="text-sm text-gray-600">Confirm your identity</p>
        </header>
        <form className="pt-4" onSubmit={updateAccountPhoneNumber}>
          <div className="form-row">
            <label htmlFor="password" className="block font-bold text-md pb-1">
              Current password
            </label>
            <input
              type="password"
              id="password"
              className="border border-black rounded-lg block w-full p-2"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="my-2">
            <button
              type="submit"
              className="bg-black text-white rounded-full font-bold py-3 px-6"
            >
              Save
            </button>
            <button
              className="font-bold py-3 px-6"
              onClick={() => goToProfile()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  } else if (isWaitingCode) {
    viewContent = (
      <PhoneNumberCodeInput
        onReceived={codeReceivedHandler}
        onBack={cancelCodeWaiting}
      />
    );
  } else {
    viewContent = (
      <PhoneNumberForm
        phoneNumber={phoneNumber}
        countryCode={countryCode}
        onChangeCountryCode={changeCountryCodeHandler}
        onChangePhoneNumber={changePhoneNumberHandler}
        onSubmit={submitPhoneNumberHandler}
        onCancel={goToProfile}
      />
    );
  }

  return (
    <main>
      <section className="flex flex-col items-center py-8">
        {viewContent}
      </section>
    </main>
  );
};

ChangePhoneNumberPage.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ChangePhoneNumberPage;
