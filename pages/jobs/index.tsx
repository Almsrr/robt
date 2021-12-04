import { ReactElement } from "react";

import type { NextPageWithLayout } from "../_app";
import Layout from "../../components/UI/Layout";
import Recents from "../../components/PopularSearches/Recents";
import router from "next/router";
import JobForm from "../../components/Jobs/JobForm";

const Jobs: NextPageWithLayout = function () {
  const searchJobs = (what: string, where: string) => {
    if (what.length === 0 || where.length === 0) return;

    const url = `/jobs/search?what=${what}&where=${where}`;
    router.push(url);
  };
  return (
    <>
      <header>
        <div className="container">
          <div className="flex justify-center py-28">
            <JobForm onSearch={searchJobs} />
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
