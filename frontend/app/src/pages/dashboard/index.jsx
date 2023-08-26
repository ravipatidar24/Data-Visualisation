import { useEffect, useState } from "react";
import "./css/style.css";
import { debounce } from "lodash";
import Charts from "./charts";
import { useCategories } from "./hooks/useCategories";
import { FilterData } from "./hooks/useFilter";

const intialValue = {
  end_year: "All",
  topic: "All",
  sector: "All",
  region: "All",
  pestle: "All",
  source: "All",
  country: "All",
};

const Dashboard = () => {
  const [size, setSize] = useState(20);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/getdata");
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    console.log(data);
  }, []);
  const { years, topics, sectors, region, pestle, source, country } =
    useCategories(data);
  const [query, setQuery] = useState(intialValue);
  const debouncedSetSliderValue = debounce((value) => {
    setSize(value);
  }, 100);
  const handleSliderChange = (event) => {
    const newValue = event.target.value;
    debouncedSetSliderValue(newValue);
  };
  const handleFilter = async () => {
    setLoading(true);
    await fetchData();
    const d = FilterData(data, query);
    setData(d);
    setLoading(false);
  };
  const resetFilter = () => {
    setQuery(intialValue);
    fetchData();
  };
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setQuery((query) => ({ ...query, [name]: value }));
    handleFilter();
  };
  return (
    <>
      <div className="container1">
        <div className="head">
          <h1>Data Visualisation</h1>
          <div
            className="text-center text-bold text-white"
            style={{ width: "100%" }}
          >
            <strong>
              <small>Made By: Ravi</small>
            </strong>
          </div>
          <div className="slider alert alert-primary">
            <div class="mb-3">
              <label for="customRange3" class="form-label text-bold">
                Change Duration
              </label>
              <input
                type="range"
                className="form-range"
                min="1"
                max={data?.length}
                value={size}
                step={"1"}
                id="customRange3"
                onChange={handleSliderChange}
              />
              <p style={{ color: "#000" }}>
                <small>
                  <strong>
                    From: {data && data[0]?.added ? data[0]?.added : "NA"}
                  </strong>
                  <br />
                  <strong>
                    To:{" "}
                    {data && data[size - 1]?.added
                      ? data[size - 1]?.added
                      : "NA"}
                  </strong>
                </small>
              </p>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                End Year
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                name="end_year"
                onChange={handleChange}
                value={query.end_year}
              >
                {years &&
                  years?.map((y) => {
                    return <option value={y}>{y}</option>;
                  })}
              </select>
            </div>
          </div>
          <div className="slider alert alert-primary">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Sectors
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                name="sector"
                onChange={handleChange}
                value={query.sector}
              >
                {sectors &&
                  sectors?.map((s) => {
                    return <option value={s}>{s}</option>;
                  })}
              </select>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Topics
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                name="topic"
                onChange={handleChange}
                value={query.topic}
              >
                {topics &&
                  topics?.map((s) => {
                    return <option value={s}>{s}</option>;
                  })}
              </select>
            </div>
          </div>
          <div className="slider alert alert-primary">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Regions
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                name="region"
                onChange={handleChange}
                value={query.region}
              >
                {region &&
                  region?.map((s) => {
                    return <option value={s}>{s}</option>;
                  })}
              </select>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Pestle
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                name="pestle"
                onChange={handleChange}
                value={query.pestle}
              >
                {pestle &&
                  pestle?.map((s) => {
                    return <option value={s}>{s}</option>;
                  })}
              </select>
            </div>
          </div>
          <div className="slider alert alert-primary">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Source
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                name="source"
                onChange={handleChange}
                value={query.source}
              >
                {source &&
                  source?.map((s) => {
                    return <option value={s}>{s}</option>;
                  })}
              </select>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Country
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                name="country"
                onChange={handleChange}
                value={query.country}
              >
                {country &&
                  country?.map((s) => {
                    return <option value={s}>{s}</option>;
                  })}
              </select>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="d-flex text-white mb-3 ">
            <button
              className="btn  btn-primary"
              style={{ marginRight: "10px" }}
              onClick={() => fetchData()}
            >
              Load Data
            </button>
            <button className="btn btn-danger" onClick={() => resetFilter()}>
              Reset
            </button>
          </div>
          <div className="d-flex text-white mb-3 ">
            <h5>Results: {data?.length ? data?.length : 0} </h5>
          </div>
          {loading && (
            <div class="d-flex align-items-center text-white">
              <strong>Loading...</strong>
              <div
                class="spinner-border ms-auto"
                role="status"
                aria-hidden="true"
              ></div>
            </div>
          )}
          {!loading && data?.length > 0 && <Charts data={data} size={size} />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
