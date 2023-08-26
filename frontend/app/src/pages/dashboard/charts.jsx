import PieChart from "../../components/charts/piechart";
import { useData } from "./hooks/useData";
import LineChart from "../../components/charts/linechart";

const Charts = ({ data, size }) => {
  const {
    intensity,
    likelihood,
    relevance,
    countryData,
    topicsData,
    regionData,
    sectorData,
  } = useData(data, size);
  return (
    <>
      <div className="first">
        <div className="alert alert-light" style={{ paddingBottom: "50px" }}>
          <h3>Country</h3>
          <PieChart data={countryData} />
        </div>
        <div
          className="alert alert-light"
          style={{ marginLeft: "30px", paddingBottom: "50px" }}
        >
          <h3>Intensity</h3>
          <LineChart data={[intensity]} />
        </div>
        <div className="alert alert-light" style={{ paddingBottom: "50px" }}>
          <h3>Likelihood</h3>
          <LineChart data={[likelihood]} />
        </div>
        <div
          className="alert alert-light"
          style={{ marginLeft: "30px", paddingBottom: "50px" }}
        >
          <h3>Relevance</h3>
          <LineChart data={[relevance]} />
        </div>
      </div>
      <div className="second">
        <div className="alert alert-light" style={{ paddingBottom: "50px" }}>
          <h3>Topics</h3>
          <PieChart data={topicsData} />
        </div>
      </div>
      <div className="first">
        <div className="alert alert-light" style={{ paddingBottom: "50px" }}>
          <h3>Regions</h3>
          <PieChart data={regionData} />
        </div>
        <div
          className="alert alert-light"
          style={{ marginLeft: "30px", paddingBottom: "50px" }}
        >
          <h3>Sectors</h3>
          <PieChart data={sectorData} />
        </div>
      </div>
    </>
  );
};

export default Charts;
