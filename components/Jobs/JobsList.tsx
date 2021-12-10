import { FC } from "react";

import JobCard from "./JobCard";
import LoadingSpinner from "../UI/Spinner/Spinner";

interface JobsListProps {
  jobs: any[];
  loading: boolean;
  targetJob: any;
  selectJob(job: any): void;
}

const JobsList: FC<JobsListProps> = function (props) {
  const { jobs, loading, targetJob, selectJob } = props;

  if (loading) {
    return (
      <div className="flex justify-center">
        <LoadingSpinner />
      </div>
    );
  } else if (jobs.length === 0) {
    return <p>Jobs not found</p>;
  } else {
    return (
      <ul className="jobs-list">
        {jobs.map((job) => (
          <li key={job.id} className="jobs-list__item">
            <JobCard
              job={job}
              selectedId={targetJob.id}
              onSelected={selectJob}
            />
          </li>
        ))}
      </ul>
    );
  }
};

export default JobsList;
