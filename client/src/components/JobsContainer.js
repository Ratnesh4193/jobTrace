import { useEffect } from "react";
import Loading from "./Loading";
import Job from "./Job";
import Alert from "./Alert";
import Wrapper from "../assets/wrappers/JobsContainer";
import PageBtnContainer from "./PageBtnContainer";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../actions/actions";

const JobsContainer = () => {
  const {
    jobs,
    showAlert,
    isLoading,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
  } = useSelector((state) => state.data);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch, search, searchStatus, searchType, sort]);

  return isLoading ? (
    <Loading center />
  ) : jobs.length === 0 ? (
    <Wrapper>
      <h2>No jobs Applications to display...</h2>
    </Wrapper>
  ) : (
    <Wrapper>
      {showAlert && <Alert />}
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
