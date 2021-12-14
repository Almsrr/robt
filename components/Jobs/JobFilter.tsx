import { ChangeEvent, FC, useRef, memo } from "react";

const JobFilter: FC<{ onFilter(type: string, value: string): void }> =
  function (props) {
    const { onFilter } = props;
    const dateSelectRef = useRef<HTMLSelectElement>(null);
    const expSelectRef = useRef<HTMLSelectElement>(null);
    const jobTypeSelectRef = useRef<HTMLSelectElement>(null);

    const filterByDateHandler = (event: ChangeEvent): void => {
      const optionValue = dateSelectRef.current!.value;
      onFilter("date-posted", optionValue);
    };
    const filterByExpLevelHandler = (event: ChangeEvent): void => {
      const optionValue = expSelectRef.current!.value;
      onFilter("exp-level", optionValue);
    };
    const filterJobTypeHandler = (event: ChangeEvent): void => {
      const optionValue = jobTypeSelectRef.current!.value;
      onFilter("job-type", optionValue);
    };

    return (
      <div className="flex">
        <div>
          <select
            id="date-posted"
            onChange={filterByDateHandler}
            ref={dateSelectRef}
          >
            <option value="any">Date posted</option>
            <option value="last24hours">Last 24 hours</option>
            <option value="last3days">Last 3 days</option>
            <option value="last7days">Last 7 days</option>
          </select>
        </div>
        <div>
          <select
            id="experience-level"
            onChange={filterByExpLevelHandler}
            ref={expSelectRef}
          >
            <option value="">Experience level</option>
            <option value="senior">Senior level</option>
            <option value="mid">Mid level</option>
            <option value="junior">Junior level</option>
            <option value="entry">Entry level</option>
          </select>
        </div>
        <div>
          <select
            id="job-type"
            onChange={filterJobTypeHandler}
            ref={jobTypeSelectRef}
          >
            <option value="">Job type</option>
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
