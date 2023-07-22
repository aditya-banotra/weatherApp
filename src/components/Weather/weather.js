import { useState } from "react";
import styles from "./index.module.css";
import axios from "axios";

export function Weather() {
  const [city, setCity] = useState(null);
  const [data, setData] = useState(null);
  async function handleOnSubmit(e) {
    try {
      const { data } = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=4ef9b0e78350405198c143211232207&q=${city}`
      );
      setData(data);
    } catch (err) {
      console.log(err);
      alert("PLease enter a valid city");
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
              <img src={"https:" + data?.current?.condition?.icon} alt="Weather"></img>
              <p className={styles.temp}>{data?.current?.temp_c}°C</p>
              <p>{data?.current?.condition?.text}</p>
              <p>
                📍{data?.location?.name}, {data?.location?.region}
              </p>
            </div>
            <div className={styles.footer}>
              <div>🌡 Feels Like: {data?.current?.feelslike_c}°C</div>
              <div>💧 Humidity: {data?.current?.humidity}</div>
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
    </div>
  );
}
