import Link from "next/link";

import { FC, useRef } from "react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phoneNumber: string;
  previewMode: boolean;
  onTogglePreview(): void;
  onSave(firstName: string, lastName: string): void;
}

const ContactInformation: FC<User> = function (props) {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  let hasFullName = false;
  let hasPhoneNumber = false;

  if (props.firstName.length !== 0 && props.lastName.length !== 0) {
    hasFullName = true;
  }
  if (props.phoneNumber.length !== 0) {
    hasPhoneNumber = true;
  }

  const saveInfoHandler = () => {
    const firstName = firstNameRef.current!.value;
    const lastName = lastNameRef.current!.value;

    if (firstName.length === 0) return;
    if (lastName.length === 0) return;

    props.onSave(firstName, lastName);
  };

  const editEmailUrl = `/account/change-email?accountId=${props.id}&email=${props.email}&role=${props.role}`;
  // const editPhoneNumberUrl = `/account/change-phone-number?account=${props.id}`;

  const preview = (
    <div className="pb-5 text-gray-500">
      {hasFullName && (
        <p className="text-sm mb-1">{`${props.firstName} ${props.lastName}`}</p>
      )}
      <p className="text-sm mb-1">{props.email}</p>
      {!hasPhoneNumber && (
        <button
          className="text-sm font-bold"
          onClick={() => props.onTogglePreview()}
        >
          Add phone number
        </button>
      )}
      {hasPhoneNumber && <p className="text-sm">{props.phoneNumber}</p>}
    </div>
  );

  const contactInformationForm = (
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
              defaultValue={props.firstName}
              ref={firstNameRef}
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
              defaultValue={props.lastName}
              ref={lastNameRef}
            />
          </div>
        </div>
      </form>
      <div className="pb-4">
        <label className="text-md block">
          Email Address{" "}
          <span className="text-xs">
            <i className="fas fa-lock pl-2 pr-1"></i>only provided to employers
            you apply or respond to.
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
            <i className="fas fa-lock pl-2 pr-1"></i>only provided to employers
            you apply or respond to.
          </span>
        </label>
        {!hasPhoneNumber && (
          <button className="text-blue-600 text-sm flex items-center">
            <i className="fas fa-plus-circle pr-2 text-lg"></i>Add phone number
          </button>
        )}
        {hasPhoneNumber && (
          <p>
            {props.phoneNumber}
            <button className="text-blue-600 text-xs mx-2">edit</button>
          </p>
        )}
      </div>
      <div className="my-5">
        <div className="flex">
          <button
            className="bg-black text-white rounded-full font-bold p-3 w-20"
            onClick={saveInfoHandler}
          >
            Save
          </button>
          <button
            className="font-bold p-3"
            onClick={() => props.onTogglePreview()}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );

  return (
    <section className="border border-gray-300 rounded-md mb-4 p-3">
      <header>
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-lg">Contact information</h2>
          {props.previewMode && (
            <button
              title="edit"
              type="button"
              className="px-2 text-md"
              onClick={() => props.onTogglePreview()}
            >
              <i className="fas fa-edit"></i>
            </button>
          )}
        </div>
      </header>
      {props.previewMode && preview}
      {!props.previewMode && contactInformationForm}
    </section>
  );
};

export default ContactInformation;
