import { FC } from "react";

const Resume: FC = function (props) {
  return (
    <section className="border border-gray-300 rounded-md mb-4 p-3">
      <header className="mb-4">
        <h1 className="font-bold text-lg">Resume</h1>
      </header>
      <div className="flex justify-center py-4">
        <button className="border-2 border-black rounded-full font-bold p-3 w-2/5">
          Upload your resume
        </button>
        <button className="ml-4 border-2 border-black rounded-full font-bold p-3 w-2/5">
          Build your resume
        </button>
      </div>
      <div className="pb-3">
        <p className="text-sm">
          By continuing, you agree to create a{" "}
          <a href="" className="text-blue-600">
            public resume
          </a>{" "}
          and agree to receiving job opportunities from employers.
        </p>
      </div>
    </section>
  );
};

export default Resume;
