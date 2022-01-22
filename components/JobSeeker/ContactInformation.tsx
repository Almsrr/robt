import { FC } from "react";
import ContactInfoPreview from "./ContactInfoPreview";
import ContactInfoForm from "./ContactInfoForm";

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
  const saveUserInfo = (firstName: string, lastName: string): void => {
    props.onSave(firstName, lastName);
  };

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
      {props.inPreview ? (
        <ContactInfoPreview
          firstName={props.firstName}
          lastName={props.lastName}
          email={props.email}
          phoneNumber={props.phoneNumber}
          onTogglePreview={props.onTogglePreview}
        />
      ) : (
        <ContactInfoForm
          firstName={props.firstName}
          lastName={props.lastName}
          email={props.email}
          phoneNumber={props.phoneNumber}
          onTogglePreview={props.onTogglePreview}
          id={props.id}
          role={props.role}
          onSaveInfo={saveUserInfo}
        />
      )}
    </section>
  );
};

export default ContactInformation;
