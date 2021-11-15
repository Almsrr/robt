import { FC, useRef } from "react";

import CustomLink from "./UI/CustomLink";

const RegisterForm: FC<{ onRegister: () => void }> = function () {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const keepSignedRef = useRef<HTMLInputElement>(null);
  const employeerRef = useRef<HTMLInputElement>(null);
  const candidateRef = useRef<HTMLInputElement>(null);

  return (
    <form className="form">
      <h1 className="text-xl mb-2">Create an Account (It&apos;s free) </h1>
      <p className="text-sm mb-3">
        By creating an account, you agree to Robt&apos;s{" "}
        <CustomLink>Terms of Service</CustomLink>,{" "}
        <CustomLink>Cookie Policy</CustomLink> and{" "}
        <CustomLink>Privacy Policy</CustomLink>. You consent to receiving
        marketing messages from Robt and may opt out from receiving such
        messages by following the unsubscribe link in our messages, or as
        detailed in our terms.
      </p>
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
      <div className="form-row mt-2">
        <div className="flex flex-col">
          <span className="text-center">or</span>
        </div>
      </div>
      <div className="form-row mb-4">
        <label className="block font-bold">Email Address</label>
        <input ref={emailRef} type="email" className="form-input w-full" />
      </div>
      <div className="form-row mb-4">
        <label className="block font-bold">Password</label>
        <input
          ref={passwordRef}
          type="password"
          className="form-input w-full"
        />
      </div>
      <div className="form-row mb-4">
        <span className="block font-bold text-sm">Your role</span>
        <p className="text-sm text-gray-600">
          Let us know how you&apos;ll be using our products
        </p>
        <div className="flex flex-col pt-2">
          <label id="employeer" className="flex items-center mb-1">
            <input
              type="radio"
              id="employeer"
              ref={employeerRef}
              name="role"
              value="employeer"
              className="mr-1"
            />
            <span>Employeer</span>
          </label>
          <label id="candidate" className="flex items-center">
            <input
              type="radio"
              id="candidate"
              ref={candidateRef}
              name="role"
              value="candidate"
              className="mr-1"
            />
            <span>Candidate</span>
          </label>
        </div>
      </div>
      <div className="form-row mb-4">
        <div className="flex items-center">
          <input
            ref={keepSignedRef}
            type="checkbox"
            id="keep-signed"
            className="mr-2"
          />
          <label htmlFor="keep-signed">Keep me signed on this device</label>
        </div>
      </div>
      <button type="submit" className="btn btn-inverted w-full">
        Create Account
      </button>
    </form>
  );
};

export default RegisterForm;
