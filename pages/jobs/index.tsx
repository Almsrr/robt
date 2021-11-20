import type { ReactElement } from "react";

import type { NextPageWithLayout } from "../_app";
import Layout from "../../components/UI/Layout";
import Recents from "../../components/PopularSearches/Recents";

const Jobs: NextPageWithLayout = function () {
  return (
    <>
      <header>
        <div className="container">
          <div className="h-48 flex items-center">
            <form className="w-full flex justify-center">
              <div className="inline-block rounded-md border border-gray-400 flex py-2 px-4 mr-3  w-1/4">
                <label htmlFor="job-keyword" className="inline-block pr-2">
                  What
                </label>
                <input
                  type="search"
                  id="job-keyword"
                  placeholder="Title, keyword or company"
                  className="w-full focus:outline-none"
                />
              </div>
              <div className="rounded-md border border-gray-400 flex py-2 px-4 focus:border-black w-1/4">
                <label htmlFor="province" className="inline-block pr-2">
                  Where
                </label>
                <input
                  type="text"
                  id="province"
                  placeholder="Province"
                  className="w-full focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="rounded-md bg-black text-white px-5 py-1 ml-4 uppercase font-bold"
              >
                Find
              </button>
            </form>
          </div>
        </div>
      </header>
      <main>
        <div className="container">
          <div className="flex">
            <section className="w-9/12 float-left">
              <h2 className="text-4xl font-bold">News </h2>
            </section>
            <aside className="w-3/12 float-right">
              <h3 className="text-2xl font-bold">Recent searches</h3>
              <Recents />
            </aside>
          </div>
        </div>
      </main>
    </>
  );
};

Jobs.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Jobs;
