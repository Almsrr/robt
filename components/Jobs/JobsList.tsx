import { FC, useState } from "react";

import JobCard from "./JobCard";

interface JobsListProps {
  jobs: any[];
  showDetail(job: any): void;
}

const JobsList: FC<JobsListProps> = function (props) {
  const { jobs, showDetail } = props;
  const [selectedItemId, setSelectedItemId] = useState(jobs[0].id);

  const selectItemHandler = (job: any) => {
    setSelectedItemId(job.id);
    showDetail(job);
  };

  if (jobs.length === 0) {
    return <p>Jobs not found</p>;
  }

  return (
    <ul className="jobs-list">
      {jobs.map((job) => (
        <li key={job.id} className="jobs-list__item">
          <JobCard
            job={job}
            selectedId={selectedItemId}
            onSelected={selectItemHandler}
          />
        </li>
      ))}
    </ul>
  );
};

export default JobsList;
