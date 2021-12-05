import { ChangeEvent, FC, FormEvent, useRef } from "react";

const JobFilter: FC<{ onFilter(type: string, value: string): void }> =
  function (props) {
    //    const filterTypeRef = useRef<HTMLInputElement>(null);
    //    const filterValueRef = useRef<HTMLInputElement>(null);

    const filterHandler = (event: ChangeEvent) => {
      //ERROR
      //       const filterValue = filterRef.current!.value;
      //       const filterType = filterRef.current!.id;
      //       if (filterType.length === 0 || filterValue.length === 0) {
      //         return;
      //       }
      //       props.onFilter(filterType, filterValue);
    };

    return (
      <div className="flex">
        <div>
          <select id="date" onChange={filterHandler}>
            <option value="">Date posted</option>
            <option value="24">Last 24 hours</option>
            <option value="3">Last 3 days</option>
            <option value="7">Last 7 days</option>
          </select>
        </div>
        <div>
          <select id="experience-level" onChange={filterHandler}>
            <option value="">Experience level</option>
            <option value="senior">Senior level</option>
            <option value="mid">Mid level</option>
            <option value="junior">Junior level</option>
            <option value="entry">Entry level</option>
          </select>
        </div>
        <div>
          <select id="job-type" onChange={filterHandler}>
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

export default JobFilter;
