import React, { useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import githubicon from "../github.png";
import linkedinicon from "../linkedin.png";
const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const CountryD = ({deaths, deathsloading, setDeathsLoading, setCountrydeaths,countrydeaths,setDeaths }) => {
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://corona.lmao.ninja/countries?sort=deaths"
      );
      const result1 = await axios("https://corona.lmao.ninja/all");
      setDeaths(result1.data.deaths);
      setCountrydeaths(result.data);
      setDeathsLoading(false);
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
        <h6 style={{ color: "white" }}>Total Deaths</h6>
        {deathsloading ? (
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
            {deaths ? numberWithCommas(deaths) : null}
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
            Confirmed Deaths by Country
          </strong>
        </div>
        {deathsloading ? (
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
            {countrydeaths.map((c, index) => {
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
                      width: "50%",
                      textAlign: "center"
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
                      width: "50%",
                      textAlign: "center",
                      fontWeight: "bold"
                    }}
                  >
                    {c.deaths ? numberWithCommas(c.deaths) : null}
                  </span>
                </div>
              );
            })}
          </>
        )}
      </div>
      <div
        className="row text-center d-none d-md-block"
        style={{
          margin:"10px 0px",
          height: "10vh",
          backgroundColor: "#212121",
          paddingTop:"10px",
           fontFamily:
            '"Avenir Next W01","Avenir Next W00","Avenir Next",Avenir,"Helvetica Neue",sans-serif'
        }}
      >
        <div className="text-center">
        <h6 style={{color:"white",fontSize:"10px"}}>Sai Varma Raghavaraju</h6>
        <div>
          <a href="https://github.com/varma1247" target="_blank" style={{marginRight:"25px"}} rel="noopener noreferrer">
          <img src={githubicon} width={30} height={30} alt="Github"></img>
          </a>
          <a href="http://www.linkedin.com/in/saivarma-raghavaraju" target="_blank" rel="noopener noreferrer">
          <img src={linkedinicon} width={35} height={30}  alt="Linkedin"></img>
          </a>
        </div>
        </div>
      </div>
    </div>
  );
};
export default CountryD;
