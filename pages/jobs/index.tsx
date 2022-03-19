import { ReactElement, ReactNode } from "react";

import type { NextPageWithLayout } from "../_app";
import Layout from "../../components/UI/Layout";
import Recents from "../../components/PopularSearches/Recents";
import router from "next/router";
import JobForm from "../../components/Jobs/JobForm";

const Jobs: NextPageWithLayout<any> = function () {
  const searchJobs = (what: string, where: string): void => {
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
        <section className="container">
          <div className="flex">
            <div className="w-9/12 float-left">
              <h2 className="text-4xl font-bold">News </h2>
            </div>
            <div className="w-3/12 float-right">
              <Recents />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

Jobs.getLayout = (page: ReactElement): ReactNode => {
  return <Layout>{page}</Layout>;
};

export default Jobs;
