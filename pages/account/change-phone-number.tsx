import { useRouter } from "next/router";
import {
  FormEvent,
  ReactElement,
  ReactNode,
  Reducer,
  useReducer,
  useRef,
} from "react";

import { NextPageWithLayout } from "../_app";
import Layout from "../../components/UI/Layout";
import axios from "axios";
import PhoneNumberForm from "../../components/PhoneNumber/PhoneNumberForm";
import PhoneNumberCodeInput from "../../components/PhoneNumber/PhoneNumberCodeInput";

interface PageData {
  countryCode: string;
  phoneNumber: string;
  isWaitingCode: boolean;
  isAuthenticating: boolean;
}

interface PageAction {
  type: string;
  payload?: any;
}

const changePhoneReducer: Reducer<PageData, PageAction> = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "VERIFY":
      return {
        ...state,
        isWaitingCode: true,
        countryCode: payload.countryCode,
        phoneNumber: payload.phoneNumber,
      };
    case "VERIFIED":
      return { ...state, isWaitingCode: false, isAuthenticating: true };

    case "CANCEL_WAITING":
      return { ...state, isWaitingCode: false };

    default:
      return { ...state };
  }
};

const initalState: PageData = {
  countryCode: "",
  phoneNumber: "",
  isWaitingCode: false,
  isAuthenticating: false,
};

const ChangePhoneNumberPage: NextPageWithLayout = function () {
  const [
    { countryCode, phoneNumber, isWaitingCode, isAuthenticating },
    dispatch,
  ] = useReducer<typeof changePhoneReducer>(changePhoneReducer, initalState);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { accountId, role } = router.query;

  const submitPhoneNumberHandler = (
    countryCode: string,
    phoneNumber: string
  ): void => {
    dispatch({ type: "VERIFY", payload: { countryCode, phoneNumber } });
  };

  const onCodeReceived = (): void => {
    dispatch({ type: "VERIFIED" });
  };

  const onCancelWaiting = (): void => {
    dispatch({ type: "CANCEL_WAITING" });
  };

  const goToProfile = (): void => {
    router.push(`/${role}/${accountId}`);
  };

  const updateAccountPhoneNumber = (event: FormEvent): void => {
    event.preventDefault();
    const completePhoneNumber = `${countryCode} ${phoneNumber}`;
    const password = passwordRef.current!.value;

    const data = { accountId, password, newPhoneNumber: completePhoneNumber };
    const url = `/api/account/update-phone`;

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

  let stage;
  if (isAuthenticating) {
    stage = (
      <div className="w-full max-w-md border border-gray-300 rounded-md p-4">
        <header className="mb-4">
          <h1 className="font-bold text-2xl mb-1">One last step</h1>
          <p className="text-sm text-gray-600">Confirm your identity</p>
        </header>
        <form onSubmit={updateAccountPhoneNumber}>
          <div className="form-row">
            <label htmlFor="password" className="block font-bold text-md pb-1">
              Current password
            </label>
            <input
              type="password"
              id="password"
              className="border border-black rounded-lg block w-full p-2"
              placeholder="Password"
              ref={passwordRef}
            />
          </div>
          <div className="my-2">
            <button
              type="submit"
              className="bg-black text-white rounded-full font-bold py-3 px-6"
            >
              Save
            </button>
            <button className="font-bold py-3 px-6" onClick={goToProfile}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  } else if (isWaitingCode) {
    stage = (
      <PhoneNumberCodeInput
        onReceived={onCodeReceived}
        onBack={onCancelWaiting}
      />
    );
  } else {
    stage = (
      <PhoneNumberForm
        code={countryCode}
        number={phoneNumber}
        onSubmit={submitPhoneNumberHandler}
        onCancel={goToProfile}
      />
    );
  }

  return (
    <main>
      <section className="flex flex-col items-center py-8">{stage}</section>
    </main>
  );
};

ChangePhoneNumberPage.getLayout = function (page: ReactElement): ReactNode {
  return <Layout>{page}</Layout>;
};

export default ChangePhoneNumberPage;
