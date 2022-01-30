import { FC } from "react";

export interface InfoPreviewProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  onTogglePreview(): void;
}

const ContactInfoPreview: FC<InfoPreviewProps> = function (props) {
  const { firstName, lastName, email, phoneNumber, onTogglePreview } = props;
  const fullName = firstName && lastName ? `${firstName} ${lastName}` : null;

  return (
    <div className="pb-5 text-gray-500">
      {fullName && <p className="text-sm mb-1">{fullName}</p>}
      <p className="text-sm mb-1">{email}</p>
      {phoneNumber ? (
        <p className="text-sm">{phoneNumber}</p>
      ) : (
        <button className="text-sm font-bold" onClick={onTogglePreview}>
          Add phone number
        </button>
      )}
    </div>
  );
};

export default ContactInfoPreview;
