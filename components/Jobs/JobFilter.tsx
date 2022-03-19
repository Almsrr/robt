import { ChangeEvent, FC, memo } from "react";

const JobFilter: FC<{ onFilter(type: string, value: string): void }> =
  function (props) {
    const { onFilter } = props;

    const ByDatePostedHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
      const filterValue = e.target.value;
      onFilter("date-posted", filterValue);
    };
    const ByExpLevelHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
      const filterValue = e.target.value;
      onFilter("exp-level", filterValue);
    };
    const ByJobTypeHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
      const filterValue = e.target.value;
      onFilter("job-type", filterValue);
    };

    // In one function
    // const filterHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
    //   const filterType = e.target.id;
    //   const filterValue = e.target.value;

    //   onFilter(filterType, filterValue);
    // };

    return (
      <div className="flex">
        <div>
          <select id="date-posted" onChange={ByDatePostedHandler}>
            <option value="all">Date posted</option>
            <option value="last24hours">Last 24 hours</option>
            <option value="last3days">Last 3 days</option>
            <option value="last7days">Last 7 days</option>
          </select>
        </div>
        <div>
          <select id="exp-level" onChange={ByExpLevelHandler}>
            <option value="all">Experience level</option>
            <option value="senior">Senior level</option>
            <option value="mid">Mid level</option>
            <option value="junior">Junior level</option>
            <option value="entry">Entry level</option>
          </select>
        </div>
        <div>
          <select id="job-type" onChange={ByJobTypeHandler}>
            <option value="all">Job type</option>
            <option value="full-time">Full time</option>
            <option value="contract">Contract</option>
            <option value="temporary">Temporary</option>
            <option value="part-time">Part time</option>
            <option value="intership">Intership</option>
          </select>
        </div>
      </div>
    );
  };

export default memo(JobFilter);
