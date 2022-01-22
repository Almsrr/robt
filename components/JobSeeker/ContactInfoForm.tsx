import Link from "next/link";

import { ChangeEvent, FC, useState } from "react";
import { InfoPreviewProps } from "./ContactInfoPreview";

interface ContactInfoProps extends InfoPreviewProps {
  id: string;
  role: string;
  onSaveInfo(firstName: string, lastName: string): void;
}

const ContactInfoForm: FC<ContactInfoProps> = function (props) {
  const [enteredFirstName, setEnteredFirstName] = useState(props.firstName);
  const [enteredLastName, setEnteredLastName] = useState(props.lastName);

  const editEmailUrl = `/account/change-email?accountId=${props.id}`;
  const updatePhoneNumberUrl = `/account/change-phone-number?accountId=${props.id}`;

  const firstNameHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setEnteredFirstName(e.target.value);
  };

  const lastNameHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setEnteredLastName(e.target.value);
  };

  const saveInfoHandler = (): void => {
    if (enteredFirstName.length === 0) return;
    if (enteredLastName.length === 0) return;

    props.onSaveInfo(enteredFirstName, enteredLastName);
  };

  return (
    <>
      <form>
        <p className="text-gray-500 mb-4">
          <span className="text-red-600">*</span> Required fields
        </p>
        <div className="form-row">
          <div className="flex flex-col">
            <label htmlFor="first-name" className="font-bold text-sm mb-2">
              First Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="first-name"
              className="border-2 border-black rounded-lg block w-full p-2"
              value={enteredFirstName}
              onChange={firstNameHandler}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="flex flex-col">
            <label htmlFor="last-name" className="font-bold text-sm mb-2">
              Last Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="last-name"
              className="border-2 border-black rounded-lg block w-full p-2"
              value={enteredLastName}
              onChange={lastNameHandler}
            />
          </div>
        </div>
      </form>
      <div className="mb-5">
        <div className="pb-4">
          <label className="text-md block">
            Email Address{" "}
            <span className="text-xs">
              <i className="fas fa-lock pl-2 pr-1"></i>only provided to
              employers you apply or respond to.
            </span>
          </label>
          <p className="font-bold">
            {props.email}{" "}
            <Link href={editEmailUrl}>
              <a className="text-blue-600 text-xs mx-2">edit</a>
            </Link>
          </p>
        </div>
        <div className="pb-4">
          <label>
            Phone Number (optional)
            <span className="text-xs">
              <i className="fas fa-lock pl-2 pr-1"></i>only provided to
              employers you apply or respond to.
            </span>
          </label>
          <p>
            {props.phoneNumber ? (
              <>
                {props.phoneNumber}
                <Link href={updatePhoneNumberUrl}>
                  <a className="text-blue-600 text-xs mx-2 font-bold">edit</a>
                </Link>
              </>
            ) : (
              <Link href={updatePhoneNumberUrl}>
                <a className="text-blue-600 text-sm flex items-center">
                  <i className="fas fa-plus-circle pr-2 text-lg"></i>Add phone
                  number
                </a>
              </Link>
            )}
          </p>
        </div>
      </div>
      <div className="mb-5 flex">
        <button
          className="bg-black text-white rounded-full font-bold p-3 w-20"
          onClick={saveInfoHandler}
        >
          Save
        </button>
        <button className="font-bold p-3" onClick={props.onTogglePreview}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default ContactInfoForm;
