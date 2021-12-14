import { FC } from "react";

import JobCard from "./JobCard";
import LoadingSpinner from "../UI/Spinner/Spinner";
import type Job from "../../models/Job";

interface JobsListProps {
  jobs: Job[];
  loading: boolean;
  selectedJob?: Job;
  error?: boolean;
  selectJob(job: Job): void;
}

const JobsList: FC<JobsListProps> = function (props) {
  const { jobs, loading, selectedJob, error, selectJob } = props;

  let selectedJobId = "";
  if (selectedJob) selectedJobId = selectedJob.id;

  if (loading) {
    return (
      <div className="flex justify-center">
        <LoadingSpinner />
      </div>
    );
  } else if (error) {
    return <p>Cannot load jobs</p>;
  } else if (jobs.length === 0) {
    return <p>Jobs not found</p>;
  } else {
    return (
      <ul className="jobs-list">
        {jobs.map((job) => (
          <li key={job.id} className="jobs-list__item">
            <JobCard
              job={job}
              selectedJobId={selectedJobId}
              onSelected={selectJob}
            />
          </li>
        ))}
      </ul>
    );
  }
};

export default JobsList;
