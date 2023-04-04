import { useState, useEffect } from 'react'
import axios from 'axios'
import './app.css' 

const PrintWeather = ({apiResponse, metricSymbol}) =>{

  //console.log(`MEtric: ${metricSymbol}`)

  if(apiResponse.main)
  {
    
    const weatherIcon = apiResponse.weather[0].icon
    const iconURL = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
    return(
      <div className="weather-card">
      <h2>{apiResponse.name}</h2>
        <h3>Temp: {apiResponse.main.temp} {metricSymbol}</h3>
        <h3>Feels like: {apiResponse.main.feels_like} {metricSymbol}</h3>
        <h3>Description: {apiResponse.weather[0].description}</h3>
        <img src={iconURL} />
        
        
        
    </div>
    )
  }
  return(<h2>Enter a city name to fetch weather info</h2>)
}

const App = () => {

  const [cityName, setCityName] = useState('')
  const [weatherURL, setweatherURL] = useState('')
  const [apiResponse, setApiResponse] = useState([])
  const [metric, setMetric] = useState('metric')
  const [formSubmit, setFormSubmit] = useState(false)
  const [metricSymbol, setMetricSymbol] = useState('℃')

  const api_key = process.env.REACT_APP_API_KEY

  const handleChange = (event) => {
    
    setCityName(event.target.value)
  }

  const handleToggle = (event) => {
    //console.log('Input toggled')
    if(event.target.checked)
    {
      setMetric('imperial')
      setMetricSymbol('℉')
    }
    else{
      setMetric('metric')
      setMetricSymbol('℃')
    }
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    setFormSubmit(true)
    setweatherURL(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${metric}&appid=${api_key}`)
  }

  useEffect(() => {
    if(formSubmit)
    {
      axios.get(weatherURL)
      .then(response => {
        setApiResponse(response.data)
        setFormSubmit(false)
 
      })
      .catch(error => {
        console.error(error)
      })

    }

  }, [formSubmit, metric, metricSymbol])
  return (
    <div className="container">
      <div className="container-box">
      <div className="item item-1">
        <form onSubmit={handleFormSubmit} className="flexbox-item flexbox-item-2"> 
        
          <label><h2>Enter the name of the city</h2></label>
          <div className="list-item">
            <p>Celsius</p>
            <label className="switch">
              <input type="checkbox" onClick={handleToggle} />
              <span className="slider round"></span>
            </label>
            <p>Fahrenheit</p>
          </div>

          


          <input type="text" onChange={handleChange} className='searchbar'/>
        </form>
      </div>
      <div className="item item-2">
      <PrintWeather apiResponse={apiResponse} metricSymbol={metricSymbol} className="item item-3"/>
      </div>
      </div>
    </div>
  );
}

export default App;
