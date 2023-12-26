import './App.css';
import { useState } from 'react';

const API_KEY = 'b9e675496db047ffbfa62858232612';

function App() {
  const [input, setInput] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setInput(e.target.value);
  }

  const callApi = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${input}`);
      const data = await response.json();
      console.log(data);
      let weatherData = [data.current.temp_c, data.current.humidity, data.current.condition.text, data.current.wind_kph];
      setWeatherData(weatherData);
      setLoading(false);
    } catch (error) {
      alert('Failed to fetch weather data');
      setLoading(false);
      setWeatherData([]);
      return null;
    }
  };

  return (
    <div>
        <input type="text" value={input} onChange={handleInput} placeholder='Enter city name'/>
        <button onClick={callApi}>Search</button>
        {weatherData.length >0 && <div className='card-container'>
          <div className='card'>
            <h5>Temperature</h5>
            <div>{weatherData[0]} C </div>
          </div>
          <div className='card'>
            <h5>Humidity</h5>
            <div>{weatherData[1]}%</div>
          </div>
          <div className='card'>
            <h5>Condition</h5>
            <div>{weatherData[2]} </div>
          </div>
          <div className='card'>
            <h5>Wind Speed</h5>
            <div>{weatherData[3]} kph</div>
          </div>
        </div>}
        {loading && <div>Loading data...</div>}
    </div>
  );
}

export default App;
