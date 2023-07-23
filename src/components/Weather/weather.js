import { useState } from "react";
import styles from "./index.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export function Weather() {
  const [city, setCity] = useState(null);
  const [data, setData] = useState(null);
  async function handleOnSubmit() {
    try {
      const { data } = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=4ef9b0e78350405198c143211232207&q=${city}`
      );
      setData(data);
      toast(
        `Weather details fetched for ${data?.location?.name}, ${data?.location?.region}`
      );
    } catch (err) {
      console.log(err);
      toast.error("Please Enter Valid City");
    }
  }
  return (
    <div className={styles.parent}>
      <div className={styles.container}>
        <div className={styles.head}>
          {" "}
          {data && (
            <span
              className={styles.back}
              onClick={() => {
                setData(null);
                setCity(null);
              }}
            >
              ⬅
            </span>
          )}
          <span>Weather App</span>
        </div>
        {data ? (
          <>
            <div>
              <img
                src={"https:" + data?.current?.condition?.icon}
                alt="Weather"
              ></img>
              <p className={styles.temp}>{data?.current?.temp_c}°C</p>
              <p>{data?.current?.condition?.text}</p>
              <p>
                📍{data?.location?.name}, {data?.location?.region}
              </p>
            </div>
            <div className={styles.footer}>
              <div
                className={styles.footerComponent}
                style={{ borderRight: "2px solid lightgray" }}
              >
                <div style={{ fontSize: "1.5rem" }}>🌡 </div>{" "}
                <div>
                  {" "}
                  <div>{data?.current?.feelslike_c}°C</div>{" "}
                  <div style={{ fontSize: ".5rem" }}>Feels Like</div>
                </div>
              </div>
              <div className={styles.footerComponent}>
                <div style={{ fontSize: "1.5rem" }}>💧 </div>{" "}
                <div>
                  {" "}
                  <div>{data?.current?.humidity}%</div>{" "}
                  <div style={{ fontSize: ".5rem" }}>Humidity</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>
            <input
              placeholder="Enter City Name"
              onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={handleOnSubmit}>Submit</button>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
