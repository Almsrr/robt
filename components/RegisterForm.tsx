import React, { FC, useRef } from "react";

import CustomLink from "./UI/CustomLink";

const RegisterForm: FC<{ onRegister: (data: any) => void }> = function (props) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const keepSignedRef = useRef<HTMLInputElement>(null);
  const employeerRef = useRef<HTMLInputElement>(null);
  const jobSeekerRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;

    if (email.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }

    let role = "";
    if (employeerRef.current!.checked) {
      role = "employeer";
    } else if (jobSeekerRef.current!.checked) {
      role = "job-seeker";
    }
    props.onRegister({ email, password, role });
  };

  return (
    <form className="form" onSubmit={submitHandler}>
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
      <div className="form-row">
        <label htmlFor="email" className="block font-bold">
          Email Address
        </label>
        <input
          ref={emailRef}
          type="email"
          className="form-input w-full"
          id="email"
        />
      </div>
      <div className="form-row mb-4">
        <label htmlFor="password" className="block font-bold">
          Password
        </label>
        <input
          ref={passwordRef}
          type="password"
          className="form-input w-full"
          id="password"
        />
      </div>
      <div className="form-row mb-4">
        <span className="block font-bold text-sm">Your role</span>
        <p className="text-sm text-gray-600">
          Let us know how you&apos;ll be using our products
        </p>
        <div className="flex flex-col pt-2">
          <label
            htmlFor="employeer"
            className="flex items-center border border-gray-500 rounded-lg p-2 text-sm mb-2"
          >
            <input
              type="radio"
              id="employeer"
              ref={employeerRef}
              name="role"
              value="employeer"
              className="mr-2"
            />
            <span>Employeer</span>
          </label>
          <label
            htmlFor="job-seeker"
            className="flex items-center border border-gray-500 rounded-lg p-2 text-sm"
          >
            <input
              type="radio"
              id="job-seeker"
              ref={jobSeekerRef}
              name="role"
              value="job-seeker"
              className="mr-2"
            />
            <span>Job seeker</span>
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
