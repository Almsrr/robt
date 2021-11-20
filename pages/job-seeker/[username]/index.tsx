import Image from "next/image";

import { ReactElement } from "react";

import type { NextPageWithLayout } from "../../_app";
import Layout from "../../../components/UI/Layout";

const Profilepage: NextPageWithLayout = function () {
  return (
    <>
      <div className="max-w-xl mx-auto mt-8">
        <header className="pb-5">
          <div className="flex items-center">
            <Image
              src="/download.png"
              alt="user-profile-picture"
              width={100}
              height={100}
            />
            <div className="ml-4">
              <h1 className="font-bold text-4xl">{}</h1>
              <p>Santo Domingo, DR</p>
            </div>
          </div>
        </header>
        <div>
          <section className="border border-gray-300 rounded-md mb-4 p-3">
            <h2 className="font-bold text-lg mb-5">Resume</h2>
            <div className="flex justify-center py-4">
              <button className="border-2 border-black rounded-full font-bold p-3 w-2/5">
                Upload your resume
              </button>
              <button className="ml-4 border-2 border-black rounded-full font-bold p-3 w-2/5">
                Build your resume
              </button>
            </div>
            <p className="text-sm">
              By continuing, you agree to create a{" "}
              <a href="" className="text-blue-600">
                public resume
              </a>{" "}
              and agree to receiving job opportunities from employers.
            </p>
          </section>
          <section className="border border-gray-300 rounded-md mb-4 p-3">
            <h2 className="font-bold text-lg mb-5">Contact information</h2>
            <form>
              <p className="text-gray-500 mb-4">
                <span className="text-red-600">*</span> Required fields
              </p>
              <div className="flex flex-col mb-4">
                <label htmlFor="first-name" className="font-bold text-sm mb-2">
                  First Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="first-name"
                  className="border-2 border-black rounded-lg block w-full p-2"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="last-name" className="font-bold text-sm mb-2">
                  Last Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="last-name"
                  className="border-2 border-black rounded-lg block w-full p-2"
                />
              </div>
            </form>
            <div className="pt-4">
              <label className="text-md block">
                Email Address{" "}
                <span className="text-xs">
                  <i className="fas fa-lock pl-2 pr-1"></i>only provided to
                  employers you apply or respond to.
                </span>
              </label>
              <p className="font-bold">
                {} <button className="text-blue-600 text-xs mx-2">edit</button>
              </p>
            </div>
            <div className="pt-4">
              <label>
                Phone Number (optional)
                <span className="text-xs">
                  <i className="fas fa-lock pl-2 pr-1"></i>only provided to
                  employers you apply or respond to.
                </span>
              </label>
              <button className="text-blue-600 text-sm flex items-center">
                <i className="fas fa-plus-circle pr-2 text-lg"></i>Add phone
                number
              </button>
            </div>
            <div className="mt-5 mb-5">
              <button className="bg-black text-white rounded-full font-bold p-3 w-20">
                Save
              </button>
              <button className="font-bold p-3">Cancel</button>
            </div>
          </section>
          <section className="border border-gray-300 rounded-md p-3">
            <h2 className="font-bold text-lg">Jobs preferences</h2>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
              consequuntur ducimus facere illum et aspernatur, perferendis
              doloremque, quaerat eos inventore mollitia dolore pariatur omnis
              dolores tempora? Nam maiores minus ab.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

Profilepage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

// export const getServerSideProps: GetServerSideProps = async function (context) {
//   const { username } = context.params as IParams;
//   const user = someUsers.find((user) => user.username === username);

//   return {
//     props: { user },
//   };
// };

export default Profilepage;
