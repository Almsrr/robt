import { useRouter } from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { ReactElement, useState } from "react";

import { NextPageWithLayout } from "../../_app";
import Layout from "../../../components/UI/Layout";
import JobsList from "../../../components/Jobs/JobsList";
import JobDetail from "../../../components/Jobs/JobDetail";
import JobForm from "../../../components/Jobs/JobForm";
import JobFilter from "../../../components/Jobs/JobFilter";

const availableJobs = [
  {
    id: "j1",
    title: "React Developer",
    location: "CA, USA",
    company: "Facebook",
    companyRate: 3.4,
    date: "02-12-2021",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque quasi tempora sint at aut, ratione nam natus ipsam sequi reiciendis molestias voluptatem ducimus dolorem modi distinctio nobis temporibus atque. Ex!",
    salary: 100.0,
    responsabilities: ["Programming", "Debug", "Test", "Desing"],
    requierements: ["1 year of experience", "React 17", "NodeJS"],
  },
  {
    id: "j2",
    title: "Angular Developer",
    location: "NY, USA",
    company: "Google",
    companyRate: 3.4,
    date: "02-12-2021",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque quasi tempora sint at aut, ratione nam natus ipsam sequi reiciendis molestias voluptatem ducimus dolorem modi distinctio nobis temporibus atque. Ex!",
    salary: 100.0,
    responsabilities: ["Programming", "Debug", "Test", "Desing"],
    requierements: ["1 year of experience", "Angular", "NodeJS"],
  },
  {
    id: "j3",
    title: "Ember Developer",
    location: "NY, USA",
    company: "Google",
    companyRate: 3.4,
    date: "02-12-2021",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque quasi tempora sint at aut, ratione nam natus ipsam sequi reiciendis molestias voluptatem ducimus dolorem modi distinctio nobis temporibus atque. Ex!",
    salary: 100.0,
    responsabilities: ["Programming", "Debug", "Test", "Desing"],
    requierements: ["1 year of experience", "Angular", "NodeJS"],
  },
  {
    id: "j4",
    title: "Vue Developer",
    location: "NY, USA",
    company: "Google",
    companyRate: 3.4,
    date: "02-12-2021",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque quasi tempora sint at aut, ratione nam natus ipsam sequi reiciendis molestias voluptatem ducimus dolorem modi distinctio nobis temporibus atque. Ex!",
    salary: 100.0,
    responsabilities: ["Programming", "Debug", "Test", "Desing"],
    requierements: ["1 year of experience", "Angular", "NodeJS"],
  },
  {
    id: "j5",
    title: "Java Developer",
    location: "NY, USA",
    company: "Google",
    companyRate: 3.4,
    date: "02-12-2021",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque quasi tempora sint at aut, ratione nam natus ipsam sequi reiciendis molestias voluptatem ducimus dolorem modi distinctio nobis temporibus atque. Ex!",
    salary: 100.0,
    responsabilities: ["Programming", "Debug", "Test", "Desing"],
    requierements: ["1 year of experience", "Angular", "NodeJS"],
  },
];

const SearchJobsPage: NextPageWithLayout = function ({
  jobs,
  input,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [jobDetail, setJobDetail] = useState({ targetJob: jobs[0] });
  const router = useRouter();

  const showJobDetailHandler = (job: any) => {
    setJobDetail({ targetJob: job });
  };

  const searchJobsHandler = (what: string, where: string) => {
    router.push(`/jobs/search?what=${what}&where=${where}`);
  };

  const filterJobHandler = (type: string, value: string) => {
    console.log(type, value);
    // const path = router.asPath;
    // console.log(router);
    // router.push(`${path}&${type}=${value}`);
  };

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
        <section className="flex mx-auto" style={{ maxWidth: 1000 }}>
          <div className="w-2/5">
            <JobsList jobs={jobs} showDetail={showJobDetailHandler} />
          </div>
          <div className="w-3/5">
            <JobDetail targetJob={jobDetail.targetJob} />
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

  return {
    props: {
      jobs: availableJobs,
      input: { what, where },
    },
  };
};

export default SearchJobsPage;
