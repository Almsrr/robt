import { FC, useState, useRef, useEffect } from "react";

import Spinner from "../UI/Spinner/Spinner";

interface PhoneNumberCodeInputProps {
  onBack(): void;
  onReceived(): void;
}

const PhoneNumberCodeInput: FC<PhoneNumberCodeInputProps> = function (props) {
  const [isLoading, setIsLoading] = useState(false);
  const codeRef = useRef<HTMLInputElement>(null);
  const { onBack, onReceived } = props;

  const nextStateTimer = useRef<NodeJS.Timeout>();
  const codeTimer = useRef<NodeJS.Timeout>();
  const loadingTimer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    loadingTimer.current = setTimeout(() => {
      setIsLoading(true);
    }, 3500);
    nextStateTimer.current = setTimeout(() => {
      codeRef.current!.value = "GS3254";
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
      <header className="mb-4">
        <h1 className="font-bold text-2xl">We sent you a code!</h1>
      </header>
      <form>
        <div className="form-row">
          <div className="flex items-center">
            <input
              type="text"
              id="phone-code"
              className="border border-black rounded-lg block p-2 w-9/12"
              placeholder="Code"
              ref={codeRef}
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
