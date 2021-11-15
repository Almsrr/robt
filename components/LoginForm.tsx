import { FC, useRef } from "react";

import Link from "next/link";
import CustomLink from "./UI/CustomLink";

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
    <form onSubmit={submitHandler} className="form">
      <h1 className="text-xl mb-1">Sign in</h1>
      <p className="mb-3 text-sm">
        By signing in to your account, you agree to Robt&apos;s{" "}
        <CustomLink>Terms of Service</CustomLink> and consent to our{" "}
        <CustomLink>Cookie Policy</CustomLink> and{" "}
        <CustomLink>Privacy Policy</CustomLink>.
      </p>
      <div className="form-row">
        <input
          ref={emailInput}
          type="text"
          placeholder="Email"
          className="w-full border border-black p-2 mb-3"
        />
      </div>
      <div className="form-row">
        <input
          ref={passwordInput}
          type="password"
          placeholder="Password"
          className="w-full border border-black p-2 mb-1"
        />
        <Link href="#">
          <a className="text-sm text-gray-600 cursor-point">
            Forgot your password?
          </a>
        </Link>
      </div>
      <div className="form-row">
        <input
          ref={keepSignedInput}
          type="checkbox"
          id="keep-signed"
          className="mr-2"
        />
        <label htmlFor="keep-signed">Keep me signed on this device</label>
      </div>
      <div className="form-row">
        <button
          type="submit"
          className="block bg-black text-white w-full p-2 rounded-lg font-bold"
        >
          Sign in
        </button>
      </div>
      <div className="socials flex flex-col">
        <span className="text-center mb-3">or</span>
        <button
          type="button"
          className="py-2 mb-2 text-center border border-black rounded-lg font-bold"
        >
          Sign in with Google
        </button>
        <button
          type="button"
          className="py-2 text-center py-2 border border-black rounded-lg font-bold"
        >
          Sign in with Facebook
        </button>
      </div>
      <div className="pt-4">
        <Link href="register">
          <a className="text-sm text-center font-bold block">
            New to Robt? Create an account
          </a>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
