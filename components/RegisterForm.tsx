import React, { ChangeEvent, FC, useState } from "react";

import CustomLink from "./UI/CustomLink";

const RegisterForm: FC<{ onRegister: (data: any) => void }> = function (props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSigned, setKeepSigned] = useState(false);
  const [role, setRole] = useState("");

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      alert("EMAIL AND PASSWORD ARE REQUIRED");
      return;
    }

    if (role.trim() === "") {
      alert("ROLE IS REQUIRED");
      return;
    }

    props.onRegister({ email, password, role });
  };

  const emailHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const keepSignedHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setKeepSigned(e.target.checked);
  };

  const roleHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setRole(e.target.value);
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
          onChange={emailHandler}
          value={email}
          type="email"
          className="form-input w-full rounded"
          id="email"
        />
      </div>
      <div className="form-row mb-4">
        <label htmlFor="password" className="block font-bold">
          Password
        </label>
        <input
          onChange={passwordHandler}
          value={password}
          type="password"
          className="form-input w-full rounded"
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
              onChange={roleHandler}
              defaultValue="employeer"
              type="radio"
              id="employeer"
              name="role"
              className="mr-2"
            />
            <span>Employeer</span>
          </label>
          <label
            htmlFor="job-seeker"
            className="flex items-center border border-gray-500 rounded-lg p-2 text-sm"
          >
            <input
              onChange={roleHandler}
              defaultValue="job-seeker"
              type="radio"
              id="job-seeker"
              name="role"
              className="mr-2"
            />
            <span>Job seeker</span>
          </label>
        </div>
      </div>
      <div className="form-row mb-4">
        <div className="flex items-center">
          <input
            onChange={keepSignedHandler}
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
