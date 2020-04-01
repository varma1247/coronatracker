import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import corona from "./corona.png";
import { HashRouter as Router } from "react-router-dom";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule
} from "react-simple-maps";
import Countries from "./components/Countries";
import CountryD from "./components/CountryD";
import "./styles.css";
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const App = () => {
  const [country, setCountry] = useState([]);
  const [countrydeaths, setCountrydeaths] = useState([]);
  const [total, setTotal] = useState();
  const [recovered, setRecovered] = useState();
  const [deaths, setDeaths] = useState();
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [deathsloading, setDeathsLoading] = useState(true);
  return (
    <Router>
      <nav
        className="navbar navbar-light"
        style={{
          fontFamily: "'Trocchi', serif",
          fontSize: "45px",
          fontWeight: "Bold",
          margin: "0px 10px",
          backgroundColor: "#202020"
        }}
      >
        <span
          class="navbar-brand  mx-auto"
          style={{ verticalAlign: "middle", color: "white", cursor: "pointer" }}
        >
          <img
            src={corona}
            width="40"
            height="40"
            class="d-inline-block align-top"
            alt=""
            className="d-inline-block align-top mr-3"
            style={{ cursor: "pointer" }}
          ></img>
          Covid19 Tracker
        </span>
      </nav>
      <div className="row p-2" style={{ marginRight: "0px", height: "6vh" }}>
        <div className="col-12 col-sm-2 pr-0">
          <Countries
            country={country}
            setCountry={setCountry}
            total={total}
            setTotal={setTotal}
            loading={loading}
            setLoading={setLoading}
            deaths={deaths}
            setDeaths={setDeaths}
            recovered={recovered}
            setRecovered={setRecovered}
          />
        </div>
        <div
          className="col-12 col-sm-8 pr-0"
          style={{
            padding: "6px",
            paddingRight: "0px",
            backgroundColor: "#171717"
          }}
        >
          <div>
            <ComposableMap
              data-tip=""
              projectionConfig={{
                scale: 400
              }}
              width={2000}
              height={1500}
              style={{ width: "90%", height: "auto" }}
            >
              <Graticule stroke="#171717" />
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map(geo => (
                    <Geography
                      key={geo.rsmKey}
                      fill="#9998A3"
                      stroke="#5d5366"
                      geography={geo}
                      onMouseEnter={() => {
                        const { NAME, ISO_A2 } = geo.properties;
                        let casesbycountry = country.filter(
                          c => c.countryInfo.iso2 === ISO_A2
                        );
                        casesbycountry = casesbycountry[0]
                          ? casesbycountry[0]
                          : {};
                        casesbycountry.name = NAME;
                        setContent(casesbycountry);
                      }}
                      onMouseLeave={() => {
                        setContent("");
                      }}
                      style={{
                        default: {
                          fill: "#D6D6DA",
                          outline: "none"
                        },
                        hover: {
                          fill: "#e60000",
                          outline: "none"
                        },
                        pressed: {
                          fill: "#E42",
                          outline: "none"
                        }
                      }}
                    />
                  ))
                }
              </Geographies>
            </ComposableMap>
            {content ? (
              <ReactTooltip place="left">
                <div style={{ fontWeight: "bold" }}>
                  <p style={{ fontSize: "20px" }}>{content.name}</p>
                  <h6 style={{ fontSize: "15px", color: "orange" }}>
                    Confirmed:{" "}
                    {content.cases ? numberWithCommas(content.cases) : 0}
                  </h6>
                  <h6 style={{ fontSize: "15px", color: "#fb6104" }}>
                    Today's Cases:{" "}
                    {content.todayCases
                      ? numberWithCommas(content.todayCases)
                      : 0}
                  </h6>
                  <h6 style={{ fontSize: "15px", color: "red" }}>
                    Deaths:{" "}
                    {content.deaths ? numberWithCommas(content.deaths) : 0}
                  </h6>
                  <h6 style={{ fontSize: "15px", color: "red" }}>
                    Today's Deaths:{" "}
                    {content.todayDeaths
                      ? numberWithCommas(content.todayDeaths)
                      : 0}
                  </h6>
                  <h6 style={{ fontSize: "15px", color: "white" }}>
                    Recovered:{" "}
                    {content.recovered
                      ? numberWithCommas(content.recovered)
                      : 0}
                  </h6>
                  <h6 style={{ fontSize: "15px", color: "#32cd32" }}>
                    Active:{" "}
                    {content.active ? numberWithCommas(content.active) : 0}
                  </h6>
                </div>
              </ReactTooltip>
            ) : null}
          </div>
        </div>
        <div className="col-12 col-sm-2 pr-0" style={{backgroundColor:"#161616"}}>
          <CountryD
            countrydeaths={countrydeaths}
            setCountrydeaths={setCountrydeaths}
            total={total}
            setTotal={setTotal}
            loading={loading}
            deathsloading={deathsloading}
            setDeathsLoading={setDeathsLoading}
            setLoading={setLoading}
            deaths={deaths}
            setDeaths={setDeaths}
          />
        </div>
      </div>
    </Router>
  );
};
export default App;
