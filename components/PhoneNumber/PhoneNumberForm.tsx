import { FC, FormEvent } from "react";

interface PhoneNumberFormProps {
  countryCode: string;
  phoneNumber: string;
  onChangeCountryCode(countryCode: string): void;
  onChangePhoneNumber(phoneNumber: string): void;
  onSubmit(): void;
  onCancel(): void;
}

const PhoneNumberForm: FC<PhoneNumberFormProps> = function (props) {
  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    props.onSubmit();
  };
  return (
    <div className="w-full max-w-3xl border border-gray-300 rounded-md p-4">
      <header>
        <h1 className="font-bold text-2xl mb-2">
          Add and verify your phone number
        </h1>
        <p className="text-sm">
          To provide the best experience for job seekers and employers, we need
          to verify that the phone number associated with your account belongs
          to you. The verification process is automated and takes less than a
          minute.
        </p>
      </header>
      <form className="pt-6" onSubmit={submitHandler}>
        <div className="max-w-sm">
          <div className="form-row mb-4">
            <label htmlFor="country" className="block font-bold text-lg pb-1">
              Country
            </label>
            <select
              className="border border-black rounded-lg block w-full p-2"
              id="country"
              value={props.countryCode}
              onChange={(event) =>
                props.onChangeCountryCode(event.target.value)
              }
            >
              <option value="">Select one</option>
              <option value="+1">Dominican Republic (+1)</option>
            </select>
          </div>
          <div className="form-row mb-4">
            <label htmlFor="phone-number" className="font-bold text-lg pb-2">
              Phone Number
            </label>
            <input
              type="text"
              id="phone-number"
              className="border border-black rounded-lg block w-full p-2"
              value={props.phoneNumber}
              onChange={(event) =>
                props.onChangePhoneNumber(event.target.value)
              }
            />
          </div>
        </div>
        <p className="mb-4 text-gray-600 text-sm">
          By providing your phone number, you confirm that you are the
          subscriber to that phone number and you agree to receive autodialed
          text messages from Indeed at that number. Message and data rates may
          apply.
        </p>
        <p className="text-gray-600 text-sm">
          Notice to job seeker accounts only: Changes to your phone number on
          this page may not be reflected everywhere on Robt, such as the phone
          number and opt-ins provided through your job seeker Profile. An
          Employer may still be able to contact you at the number in your
          Profile, if you have opted in to be contacted on that page. If you are
          a job seeker, click here to change your number on your job seeker
          Profile.
        </p>
        <div className="my-6">
          <button
            type="submit"
            className="bg-black text-white rounded-full font-bold py-3 px-6"
          >
            Next
          </button>
          <button
            className="font-bold py-3 px-6"
            onClick={() => props.onCancel()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PhoneNumberForm;
