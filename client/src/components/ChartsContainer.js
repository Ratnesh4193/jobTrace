import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import Wrapper from "../assets/wrappers/ChartsContainer";
import { useSelector } from "react-redux";

const ChartsContainer = () => {
  const { monthlyApplications: data } = useSelector((state) => state.data);
  return (
    <Wrapper>
      <h4>Monthly Job Applications</h4>
      {<BarChart data={data} />}
      {<AreaChart data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;
