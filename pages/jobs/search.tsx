import { useRouter } from "next/router";

import React, {
  ReactElement,
  useEffect,
  useCallback,
  useReducer,
  Reducer,
  useState,
  ReactNode,
  useRef,
} from "react";

import { NextPageWithLayout } from "../_app";
import Layout from "../../components/UI/Layout";
import JobsList from "../../components/Jobs/JobsList";
import JobDetail from "../../components/Jobs/JobDetail";
import JobForm from "../../components/Jobs/JobForm";
import JobFilter from "../../components/Jobs/JobFilter";
import type Job from "../../models/Job";
import axios from "axios";
import { JobsState, JobsAction } from "../../models/JobsSearch/index";

const jobsReducer: Reducer<JobsState, JobsAction> = (state, action) => {
  const { type, payload, input } = action;
  switch (type) {
    case "PENDING":
      return { ...state, isLoading: true };

    case "COMPLETED":
      if (payload && input) {
        return {
          isLoading: false,
          list: payload,
          error: false,
          userInput: input,
        };
      } else if (payload) {
        return {
          ...state,
          isLoading: false,
          list: payload,
          error: false,
        };
      }
      return state;

    case "ERROR":
      return { ...state, isLoading: false, error: true };

    default:
      return state;
  }
};

const initalState: JobsState = {
  list: [],
  isLoading: true,
  error: false,
  userInput: { keyword: "", location: "" },
};

interface QueryParam {
  name: string;
  value: string;
}

const SearchJobsPage: NextPageWithLayout<any> = function () {
  const [jobs, dispatchJobs] = useReducer<typeof jobsReducer>(
    jobsReducer,
    initalState
  );
  const [targetJob, setTargetJob] = useState<Job>();
  const router = useRouter();
  const { what, where } = router.query;

  const jobsBaseRouteRef = useRef(`api/jobs?what=${what}&where=${where}`);
  const datePostedValueRef = useRef("");
  const experienceLevel = useRef("");
  const jobType = useRef("");

  const selectJobHandler = (job: Job): void => {
    setTargetJob(job);
  };

  const searchJobsHandler = useCallback(
    (keyword: string, location: string): void => {
      dispatchJobs({ type: "PENDING" });
      const url = `/jobs/search?what=${keyword}&where=${location}`;
      router.replace(url);
    },
    [router]
  );

  const constructJobsRoute = useCallback((queryParam: QueryParam): void => {
    const { name, value } = queryParam;

    switch (name) {
      case "date-posted":
        if (!jobsBaseRouteRef.current.includes("datePosted")) {
          datePostedValueRef.current = value;
          jobsBaseRouteRef.current = jobsBaseRouteRef.current.concat(
            `&datePosted=${value}`
          );
        } else {
          jobsBaseRouteRef.current = jobsBaseRouteRef.current.replace(
            datePostedValueRef.current,
            value
          );
        }
        break;
      case "exp-level":
        // jobsBaseRouteRef.current = jobsBaseRouteRef.current.concat(
        //   `&expLevel=${value}`
        // );
        break;
      case "job-type":
        // jobsBaseRouteRef.current = jobsBaseRouteRef.current.concat(
        //   `&expLevel=${value}`
        // );
        break;

      default:
        break;
    }
  }, []);

  const filterJobHandler = useCallback(
    (name: string, value: string): void => {
      const param = { name, value };
      constructJobsRoute(param);

      console.log(jobsBaseRouteRef.current);

      // dispatchJobs({ type: "PENDING" });
      // axios
      //   .get<Job[]>(url)
      //   .then(response => {
      //     setTargetJob(response.data[0]);
      //     dispatchJobs({ type: "COMPLETED", payload: response.data });
      //   })
      //   .catch((e: any) => {
      //     dispatchJobs({ type: "ERROR" });
      //     console.log(e);
      //   });
    },
    [constructJobsRoute]
  );

  useEffect(() => {
    const { what, where } = router.query;
    const whatInputWord = what?.toString();
    const whereInputWord = where?.toString();

    if (whatInputWord && whereInputWord) {
      axios
        .get<Job[]>(`/api/jobs?what=${whatInputWord}&where=${whereInputWord}`)
        .then(response => {
          setTargetJob(response.data[0]);
          dispatchJobs({
            type: "COMPLETED",
            payload: response.data,
            input: { keyword: whatInputWord, location: whereInputWord },
          });
        })
        .catch((e: ErrorEvent) => {
          if (axios.isAxiosError(e)) {
            // handle axios error
          }
          console.log(e.message);
          dispatchJobs({ type: "ERROR" });
        });
    }
  }, [router.query]);

  return (
    <>
      <header className="py-8">
        <div className="mx-auto" style={{ maxWidth: 1000 }}>
          <JobForm input={jobs.userInput} onSearch={searchJobsHandler} />
          <div className="pt-4">
            <JobFilter onFilter={filterJobHandler} />
          </div>
        </div>
      </header>
      <main className="bg-gray-100 py-8">
        <section className="mx-auto" style={{ maxWidth: 1000 }}>
          <p className="text-sm text-gray-600 font-bold mb-2">
            Jobs found: {jobs.list.length}
          </p>
          <div className="flex">
            <div className="w-2/5">
              <JobsList
                jobs={jobs.list}
                selectedJob={targetJob}
                selectJob={selectJobHandler}
                loading={jobs.isLoading}
              />
            </div>
            <div className="w-3/5">
              <JobDetail targetJob={targetJob} loading={jobs.isLoading} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

SearchJobsPage.getLayout = (page: ReactElement): ReactNode => {
  return <Layout>{page}</Layout>;
};

export default SearchJobsPage;
