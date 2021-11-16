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
          type="email"
          placeholder="Email"
          className="form-input w-full"
        />
      </div>
      <div className="form-row">
        <input
          ref={passwordInput}
          type="password"
          placeholder="Password"
          className="form-input w-full"
        />
        <Link href="#">
          <a className="text-sm text-gray-600 cursor-point mt-1">
            Forgot your password?
          </a>
        </Link>
      </div>
      <div className="form-row">
        <div className="flex items-center">
          <input
            ref={keepSignedInput}
            type="checkbox"
            id="keep-signed"
            className="mr-2"
          />
          <label htmlFor="keep-signed">Keep me signed on this device</label>
        </div>
      </div>
      <button type="submit" className="btn btn-inverted w-full">
        Sign in
      </button>
      <div className="form-row mt-3">
        <div className="flex flex-col">
          <span className="text-center">or</span>
        </div>
      </div>
      <div className="form-row">
        <div className="socials flex flex-col">
          <button type="button" className="btn btn-simple w-full mb-2">
            Sign in with Google
          </button>
          <button type="button" className="btn btn-simple w-full">
            Sign in with Facebook
          </button>
        </div>
      </div>
      <div className="mt-1">
        <Link href="./register">
          <a className="text-sm text-center font-bold block">
            New to Robt? Create an account
          </a>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
