import { FC } from "react";
import Spinner from "../UI/Spinner/Spinner";

interface JobDetailProps {
  targetJob: any;
  loading: boolean;
}

const JobDetail: FC<JobDetailProps> = function (props) {
  const { loading, targetJob } = props;
  // console.log(targetJob);

  if (loading) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  } else if (!targetJob) {
    return (
      <p className="font-bold text-center text-gray-600">
        Select one job to view its details
      </p>
    );
  } else {
    return (
      <aside className="p-4 bg-white border border-black sticky top-2 max-h-screen">
        <header>
          <h1 className="font-bold text-3xl">{targetJob.title}</h1>
          <p>
            {targetJob.company} <span>{targetJob.companyRate}</span>
          </p>
          <p>{targetJob.location}</p>
          <p>{targetJob.publicationDate}</p>
        </header>
        <section className="pt-6">
          <h3 className="font-bold text-2xl mb-1">Job Detail</h3>
          <p>{targetJob.description}</p>
          <h4 className="font-bold mt-4">Requeriements</h4>
          <ul style={{ listStyle: "disc inside" }}>
            {targetJob.requierements.map((req: any, i: number) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
          <h4 className="font-bold mt-4">Responsabilites</h4>
          <ul style={{ listStyle: "disc inside" }}>
            {targetJob.responsabilities.map((res: any, i: number) => (
              <li key={i}>{res}</li>
            ))}
          </ul>
          <h4 className="font-bold mt-4">Salary</h4>
          <p>{targetJob.salary}</p>
        </section>
        <div className="pt-4">
          <button
            type="button"
            className="rounded-md bg-black text-white px-6 py-2 uppercase font-bold"
          >
            Apply
          </button>
        </div>
      </aside>
    );
  }
};

export default JobDetail;
