import { FC } from "react";

const JobCard: FC<{
  job: any;
  selectedId: string;
  onSelected(job: any): void;
}> = function (props) {
  const { selectedId, job, onSelected } = props;

  let artClasses = "p-4 cursor-pointer bg-white border";
  if (selectedId === job.id) {
    artClasses += " border-black";
  }

  return (
    <article className={artClasses} onClick={onSelected.bind(null, job)}>
      <header>
        <h2 className="font-bold text-xl">{job.title}</h2>
        <p>{job.company}</p>
        <p>{job.location}</p>
        <p>{job.date}</p>
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
