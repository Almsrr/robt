import { FC } from "react";

import type Job from "../../models/Job";

const JobCard: FC<{
  job: Job;
  selectedJobId: string;
  onSelected(job: Job): void;
}> = function (props) {
  const { selectedJobId, job, onSelected } = props;

  let cardClasses = "p-4 cursor-pointer bg-white border";
  if (selectedJobId === job.id) cardClasses += " border-black";

  return (
    <article className={cardClasses} onClick={onSelected.bind(null, job)}>
      <header>
        <h2 className="font-bold text-xl">{job.title}</h2>
        <p>{job.company}</p>
        <p>{job.location}</p>
        <p>{job.publicationDate}</p>
      </header>
      <section className="pt-4">
        <p className="text-sm text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At, illo?
        </p>
      </section>
    </article>
  );
};

export default JobCard;
