import { FC, useRef } from "react";

interface loginFormProps {
  onLogin: (email: string, password: string) => void;
}

const LoginForm: FC<loginFormProps> = function (props) {
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const keepSignedInput = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredEmail = emailInput.current!.value;
    const enteredPassword = passwordInput.current!.value;
    const keepSigned = keepSignedInput.current!.checked;

    if (enteredEmail.trim().length === 0) {
      return;
    } else if (enteredPassword.length === 0) {
      return;
    }
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <form
      onSubmit={submitHandler}
      className="w-96 mx-auto border border-gray-400 rounded p-4"
    >
      <h1 className="font-bold text-xl mb-1">Sign in</h1>
      <p className="mb-2 text-sm">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi
        aliquam voluptatem reiciendis, quisquam at dignissimos.
      </p>
      <div>
        <input
          ref={emailInput}
          type="text"
          placeholder="Email"
          className="w-full border border-black p-2 mb-3"
        />
      </div>
      <div>
        <input
          ref={passwordInput}
          type="password"
          placeholder="Password"
          className="w-full border border-black p-2 mb-3"
        />
      </div>
      <div>
        <input
          ref={keepSignedInput}
          type="checkbox"
          id="keep-signed"
          className="mr-2"
        />
        <label htmlFor="keep-signed">Keep me signed on this device</label>
      </div>
      <button
        type="submit"
        className="block mt-5 bg-black text-white w-full p-2 rounded-lg font-bold"
      >
        Log in
      </button>
      <div className="socials">
        <div className="text-center w-full py-2">or</div>
        <button
          type="button"
          className="block text-center w-full py-2 border border-black rounded-lg font-bold mb-2"
        >
          Sign in with Google
        </button>
        <button
          type="button"
          className="block text-center w-full py-2 border border-black rounded-lg font-bold "
        >
          Sign in with Facebook
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
