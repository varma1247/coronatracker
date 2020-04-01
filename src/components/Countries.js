import React, { useEffect } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const Countries = ({
  country,
  setCountry,
  total,
  setTotal,
  loading,
  setLoading,
  recovered,
  setRecovered
}) => {
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://corona.lmao.ninja/countries?sort=cases"
      );
      const result1 = await axios("https://corona.lmao.ninja/all");

      setCountry(result.data);
      setTotal(result1.data.cases);
      setRecovered(result1.data.recovered);
      setLoading(false);
    };
    fetchData();
  });
  return (
    <div>
      <div
        className="text-center p-3"
        style={{
          backgroundColor: "#212121",
          fontFamily:
            '"Avenir Next W01","Avenir Next W00","Avenir Next",Avenir,"Helvetica Neue",sans-serif'
        }}
      >
        <h6 style={{ color: "white" }}>Total Cases</h6>
        {loading ? (
          <div className="text-center" style={{ verticalAlign: "middle" }}>
            <span>
              <CircularProgress
                style={{ marginTop: "10px" }}
                color="secondary"
              />
            </span>
          </div>
        ) : (
          <h5 style={{ color: "orange", fontWeight: "bold" }}>
            {total ? numberWithCommas(total) : null}
          </h5>
        )}
      </div>
      <div
        style={{
          height: "60vh",
          overflowY: "auto",
          backgroundColor: "#212121",
          marginTop: "10px"
        }}
      >
        <div className="text-center" style={{ marginBottom: "10px" }}>
          <strong
            style={{
              fontSize: "15px",
              color: "white",
              fontFamily:
                '"Avenir Next W01","Avenir Next W00","Avenir Next",Avenir,"Helvetica Neue",sans-serif'
            }}
          >
            Confirmed Cases by Country
          </strong>
        </div>
        {loading ? (
          <div className="text-center" style={{ verticalAlign: "middle" }}>
            <span>
              <CircularProgress
                style={{ marginTop: "10px" }}
                color="secondary"
              />
            </span>
          </div>
        ) : (
          <>
            {country.map((c, index) => {
              return (
                <div
                  key={index}
                  style={{
                    borderBottom: "1px solid #5c5c5c",
                    display: "flex",
                    justifyContent: "space-around"
                  }}
                >
                  <span
                    style={{
                      color: "white",
                      fontSize: "20px",
                      textAlign: "center",
                      width: "50%"
                    }}
                  >
                    {c.country}
                  </span>
                  <span
                    style={{
                      color: "orange",
                      marginLeft: "10px",
                      marginRight: "5px",
                      fontSize: "20px",
                      textAlign: "center",
                      fontWeight: "bold",
                      width: "50%"
                    }}
                  >
                    {c.cases ? numberWithCommas(c.cases) : null}
                  </span>
                </div>
              );
            })}
          </>
        )}
      </div>
      <div
        className="row text-center"
        style={{
          margin: "10px 0px",
          height: "10vh",
          backgroundColor: "#212121",
          paddingTop: "10px",
          fontFamily:
            '"Avenir Next W01","Avenir Next W00","Avenir Next",Avenir,"Helvetica Neue",sans-serif'
        }}
      >
        <div className="text-center">
          <h6 style={{ color: "white", fontSize: "20px" }}>Total Recovered</h6>
          <h6 style={{ color: "orange", fontSize: "20px", fontWeight: "bold" }}>
            {recovered}
          </h6>
        </div>
      </div>
    </div>
  );
};
export default Countries;
