import { FC, FormEvent, useRef } from "react";

const JobForm: FC<{
  input?: { what: string; where: string };
  onSearch(what: string, where: string): void;
}> = function (props) {
  const { input, onSearch } = props;
  const whatRef = useRef<HTMLInputElement>(null);
  const whereRef = useRef<HTMLInputElement>(null);

  let whatDefaultValue = "";
  let whereDefaultValue = "";

  if (input) {
    whatDefaultValue = input.what;
    whereDefaultValue = input.where;
  }

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const what = whatRef.current!.value;
    const where = whereRef.current!.value;

    if (what.length === 0 || where.length === 0) {
      return;
    }
    onSearch(what, where);
  };

  return (
    <form
      className="flex w-full"
      onSubmit={submitHandler}
      style={{ maxWidth: 800 }}
    >
      <div className="rounded-md border border-gray-400 flex py-2 px-4 w-2/5">
        <label htmlFor="job-keyword" className="inline-block pr-2">
          What
        </label>
        <input
          type="search"
          id="job-keyword"
          placeholder="Title, keyword or company"
          className="w-full focus:outline-none"
          ref={whatRef}
          defaultValue={whatDefaultValue}
        />
      </div>
      <div className="rounded-md border border-gray-400 flex py-2 px-4 w-2/5 ml-3">
        <label htmlFor="province" className="inline-block pr-2">
          Where
        </label>
        <input
          type="text"
          id="province"
          placeholder="Province"
          className="w-full focus:outline-none"
          ref={whereRef}
          defaultValue={whereDefaultValue}
        />
      </div>
      <button
        type="submit"
        className="rounded-md bg-black text-white uppercase font-bold ml-4 w-32"
      >
        Find Jobs
      </button>
    </form>
  );
};

export default JobForm;