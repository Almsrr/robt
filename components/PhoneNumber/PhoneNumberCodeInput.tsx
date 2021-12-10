import { FC, useState, useRef, useEffect } from "react";

import Spinner from "../UI/Spinner/Spinner";

interface PhoneNumberCodeInputProps {
  onBack(): void;
  onReceived(): void;
}

const PhoneNumberCodeInput: FC<PhoneNumberCodeInputProps> = function (props) {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { onBack, onReceived } = props;

  let nextStateTimer = useRef<NodeJS.Timeout>();
  let codeTimer = useRef<NodeJS.Timeout>();
  let loadingTimer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    loadingTimer.current = setTimeout(() => {
      setIsLoading(true);
    }, 3500);
    nextStateTimer.current = setTimeout(() => {
      setCode("GS3254");
      setIsLoading(false);
    }, 3700);
    codeTimer.current = setTimeout(() => {
      onReceived();
    }, 4000);
  }, [onReceived]);

  const backHandler = () => {
    clearTimeout(nextStateTimer.current!);
    clearTimeout(codeTimer.current!);
    clearTimeout(loadingTimer.current!);
    onBack();
  };

  return (
    <div className="w-full max-w-sm border border-gray-300 rounded-md p-4">
      <header>
        <h1 className="font-bold text-2xl">We sent you a code!</h1>
      </header>
      <form className="pt-4">
        <div className="form-row">
          <div className="flex items-center">
            <input
              type="text"
              id="phone-code"
              className="border border-black rounded-lg block p-2 w-9/12"
              placeholder="Code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
            />
            {isLoading && (
              <div className="ml-4">
                <Spinner />
              </div>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={backHandler}
          className="text-sm text-blue-600 block w-max mx-auto my-2 mb-2"
        >
          Did not receive the code?
        </button>
      </form>
    </div>
  );
};

export default PhoneNumberCodeInput;
