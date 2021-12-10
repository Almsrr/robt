import { useRouter } from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import React, { ReactElement, useEffect, useState, useCallback } from "react";

import { NextPageWithLayout } from "../../_app";
import Layout from "../../../components/UI/Layout";
import JobsList from "../../../components/Jobs/JobsList";
import JobDetail from "../../../components/Jobs/JobDetail";
import JobForm from "../../../components/Jobs/JobForm";
import JobFilter from "../../../components/Jobs/JobFilter";
import { getJobs } from "../../api/db-api";
import type Job from "../../../models/Job";

const SearchJobsPage: NextPageWithLayout = function ({
  jobs,
  input,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const router = useRouter();

  const selectJobHandler = (job: any): void => {
    setSelectedJob(job);
  };

  const searchJobsHandler = useCallback(
    (what: string, where: string): void => {
      setIsLoading(true);
      router.replace(`/jobs/search?what=${what}&where=${where}`);
    },
    [router]
  );

  const filterJobHandler = useCallback((type: string, value: string): void => {
    console.log(type, value);
    // const path = router.asPath;
    // console.log(router);
    // router.push(`${path}&${type}=${value}`);
  }, []);

  // console.log(jobs);
  // console.log(isLoading);
  // console.log(selectedJob);

  useEffect(() => {
    const firstJob = jobs[0] || null;
    setSelectedJob(firstJob);

    setIsLoading(false);
  }, [jobs]);

  return (
    <>
      <header className="py-8">
        <div className="mx-auto" style={{ maxWidth: 1000 }}>
          <JobForm input={input} onSearch={searchJobsHandler} />
          <div className="pt-4">
            <JobFilter onFilter={filterJobHandler} />
          </div>
        </div>
      </header>
      <main className="bg-gray-100 py-8">
        <section className="mx-auto" style={{ maxWidth: 1000 }}>
          <p className="text-sm text-gray-600 font-bold mb-2">
            Jobs found: {jobs.length}
          </p>
          <div className="flex">
            <div className="w-2/5">
              <JobsList
                jobs={jobs}
                targetJob={selectedJob}
                selectJob={selectJobHandler}
                loading={isLoading}
              />
            </div>
            <div className="w-3/5">
              <JobDetail targetJob={selectedJob} loading={isLoading} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

SearchJobsPage.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { what, where } = context.query;
  let availableJobs: Job[] = [];

  if (what && where) {
    //get jobs
    const keyword = what.toString();
    const location = where.toString();

    const loadedJobs = await getJobs(keyword, location);
    if (loadedJobs) {
      availableJobs = loadedJobs;
    }
  }

  return {
    props: {
      jobs: availableJobs,
      input: { what, where },
    },
  };
};

export default SearchJobsPage;
