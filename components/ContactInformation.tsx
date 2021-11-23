import { FC, useRef, useState } from "react";

interface User {
  firstName: string | null;
  lastName: string | null;
  email: string;
  phoneNumber: string;
  onSave(firstName: string, lastName: string): void;
}

const ContactInformation: FC<User> = function (props) {
  const [previewMode, setPreviewMode] = useState<boolean>(true);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  const hasPhoneNumber = props.phoneNumber.length !== 0 ? true : false;

  const userFirstName = props.firstName ? props.firstName : "";
  const userLastName = props.lastName ? props.lastName : "";

  const saveInfoHandler = () => {
    const firstName = firstNameRef.current!.value;
    const lastName = lastNameRef.current!.value;

    if (firstName.length === 0) return;
    if (lastName.length === 0) return;

    props.onSave(firstName, lastName);
  };

  const togglePreviewMode = () => {
    setPreviewMode((prevState) => !prevState);
  };

  const preview = (
    <div className="pb-5 text-gray-500">
      <p className="text-sm mb-1">{props.email}</p>
      {!hasPhoneNumber && <p className="text-sm font-bold">Add phone number</p>}
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
              defaultValue={userFirstName}
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
              defaultValue={userLastName}
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
          <button className="text-blue-600 text-xs mx-2">edit</button>
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
          <button className="font-bold p-3" onClick={togglePreviewMode}>
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
          {previewMode && (
            <button
              type="button"
              className="px-2 text-md"
              onClick={togglePreviewMode}
            >
              <i className="fas fa-edit"></i>
            </button>
          )}
        </div>
      </header>
      {previewMode && preview}
      {!previewMode && contactInformationForm}
    </section>
  );
};

export default ContactInformation;
