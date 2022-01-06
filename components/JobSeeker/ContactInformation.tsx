import Link from "next/link";
import { FC, useRef } from "react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phoneNumber: string;
  inPreview: boolean;
  onTogglePreview(): void;
  onSave(firstName: string, lastName: string): void;
}

const ContactInformation: FC<User> = function (props) {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  const editEmailUrl = `/account/change-email?accountId=${props.id}&email=${props.email}&role=${props.role}`;
  const updatePhoneNumberUrl = `/account/change-phone-number?accountId=${props.id}&role=${props.role}`;

  const saveInfoHandler = (): void => {
    const firstName = firstNameRef.current!.value;
    const lastName = lastNameRef.current!.value;

    if (firstName.length === 0) return;
    if (lastName.length === 0) return;

    props.onSave(firstName, lastName);
  };

  const preview = (
    <div className="pb-5 text-gray-500">
      <p className="text-sm mb-1">{`${props.firstName} ${props.lastName}`}</p>
      <p className="text-sm mb-1">{props.email}</p>
      {props.phoneNumber ? (
        <p className="text-sm">{props.phoneNumber}</p>
      ) : (
        <button className="text-sm font-bold" onClick={props.onTogglePreview}>
          Add phone number
        </button>
      )}
    </div>
  );

  const contactInformation = (
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

  return (
    <section className="border border-gray-300 rounded-md mb-4 p-3">
      <header className="flex justify-between mb-4">
        <h2 className="font-bold text-lg">Contact information</h2>
        {props.inPreview && (
          <button
            title="edit"
            type="button"
            className="px-2 text-md"
            onClick={props.onTogglePreview}
          >
            <i className="fas fa-edit"></i>
          </button>
        )}
      </header>
      {props.inPreview ? preview : contactInformation}
    </section>
  );
};

export default ContactInformation;
