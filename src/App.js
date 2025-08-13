import React, { useState } from "react";
import axios from "axios";

function App() {
  const [locations, setLocations] = useState(["", "", ""]);
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = "ae2b9adcc9134f4b8b1122731250308"; // Replace with your actual key

  const handleChange = (index, value) => {
    const updatedLocations = [...locations];
    updatedLocations[index] = value;
    setLocations(updatedLocations);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const results = [];

    for (const location of locations) {
      if (location.trim() !== "") {
        try {
          const response = await axios.get(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`
          );
          results.push({
            name: location,
            data: response.data,
          });
        } catch (error) {
          results.push({
            name: location,
            error: "Not Found / Invalid Location",
          });
        }
      }
    }

    setWeatherData(results);
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>Weather Checker</h2>
      {locations.map((loc, idx) => (
        <input
          key={idx}
          type="text"
          placeholder={`Enter city/country ${idx + 1}`}
          value={loc}
          onChange={(e) => handleChange(idx, e.target.value)}
          style={{
            display: "block",
            margin: "10px 0",
            padding: "8px",
            width: "300px",
          }}
        />
      ))}
      <button onClick={handleSubmit} disabled={loading} style={{ padding: "10px 20px" }}>
        {loading ? "Loading..." : "Submit"}
      </button>

      <div style={{ marginTop: "20px" }}>
        {weatherData.map((entry, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: "15px",
              borderBottom: "1px solid #ccc",
              paddingBottom: "10px",
            }}
          >
            <strong>{entry.name}</strong>
            {entry.error ? (
              <p style={{ color: "red" }}>{entry.error}</p>
            ) : (
              <div>
                <p>Temperature: {entry.data.current.temp_c} °C</p>
                <p>Weather: {entry.data.current.condition.text}</p>
                <p>Humidity: {entry.data.current.humidity}%</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
