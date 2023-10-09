import { useEffect } from "react";
import { StatsContainer, Loading, ChartsContainer } from "../../components";
import { showStats } from "../../actions/actions";
import { useDispatch, useSelector } from "react-redux";
const Stats = () => {
  const { isLoading, monthlyApplications } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showStats());
  }, [dispatch]);
  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
