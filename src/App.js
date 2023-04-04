import React, { useState } from 'react'
import axios from 'axios'
// import React, { useState, useEffect } from 'react';
// import "./css/style.css";

// function App ()  {

//   const [humidity, setHumdity] = useState(null);
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=54d6ced3ba645f45dd959d83a7c0b199`;


//     const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=54d6ced3ba645f45dd959d83a7c0b199`;
//     const response = await fetch(url);
//     const resJson = await response.json();
//     console.log(resJson);


//   const searchLocation = (event) => {
//     if (event.key === 'Enter') {
//       axios.get(url).then((response) => {
//         setData(response.data)
//         setHumdity(response.data.main.humidity) ;

//         console.log(response.data)
//         console.log(humidity) ;
//       })
//       setLocation('')
//     }
//   }

//import "D:\react_\tempapp\tempreact\src\components\css\style.css"
// D:\react_\tempapp\tempreact\src\components\Tempapp.js

const App = () => {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const [city, setCity] = useState(null);
  const [search, setSearch] = useState(null);
  const [temp, setTemp] = useState(null);
  const [min, setMin] = useState(null);
  const [max, setmax] = useState(null);
  const [humidity, setHumdity] = useState(null);
  const [desc, setDesc] = useState(null);
  const [country, setCountry] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null)
  const [time, setTime] = useState(null);
  const [found, setFound] = useState(false);
  const [first, setFirst] = useState(true);
  const [img, setImg] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const [so2, setSo2] = useState(null);
  const [no2, setNo2] = useState(null);
  const [pm2_5, setPm2_5] = useState(null);
  const [pm10, setPm10] = useState(null);
  const [o3, setO3] = useState(null);
  const [co, setCo] = useState(null);
  const [feels_like, setFeels_like] = useState(null);
  const [speed, setSpeed] = useState(null);

  // useEffect ( ){


  // } ,[search] 


  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // var year = a.getFullYear();
    // var month = months[a.getMonth()];
    // var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = hour + ':' + min + ':' + sec;
    return time;
  }
  function dateConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = hour + ':' + min + ':' + sec + '  ' + date + ' ' + month + ' ' + year;
    return time;
  }


  function handleClick() {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=54d6ced3ba645f45dd959d83a7c0b199`;
      // const response = await fetch(url);
      // const resJson = await response.json();
      await fetch(url)
        .then(response => response.json())
        .then(async(resJson) => {


          const urlair = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${resJson?.coord?.lat}&lon=${resJson?.coord?.lon}&appid=54d6ced3ba645f45dd959d83a7c0b199`
          // const response2 = await fetch(urlair);
          // const resJson2 = await response2.json();
          await fetch(urlair)
            .then(response => response.json())
            .then((resJson2) => {
              console.log(resJson2);
              setAqi(resJson2.list[0].main.aqi);
              setSo2(resJson2.list[0].components.so2);
              setNo2(resJson2.list[0].components.no2);
              setPm10(resJson2.list[0].components.pm10);
              setPm2_5(resJson2.list[0].components.pm2_5);
              setO3(resJson2.list[0].components.o3);
              setCo(resJson2.list[0].components.co);

              console.log(aqi);
              //
              if (resJson2.list[0].main.aqi === 1) {
                setStatus("Good");
                setMessage("Air quality is satisfactory, and air pollution poses little or no risk.");
              }
              else if (resJson2.list[0].main.aqi === 2) {
                setStatus("Fair");
                setMessage("Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.");
              }
              else if (resJson2.list[0].main.aqi === 3) {
                setStatus("Moderate");
                setMessage("Members of sensitive groups may experience health effects. The general public is less likely to be affected.");
              }
              else if (resJson2.list[0].main.aqi === 4) {
                setStatus("Poor");
                setMessage("Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.");
              }
              else if (resJson2.list[0].main.aqi === 5) {
                setStatus("Very Poor");
                setMessage("Health alert: The risk of health effects is increased for everyone.Everyone is more likely to be affected.");
              }
       
            })

        //  console.log(resJson);
          setFirst(false);

          if (resJson.cod === "404") setFound(false);
          else setFound(true);




          //

      
          console.log(status);
          console.log(message);
          //   console.log(aqi);

          setImg(resJson.weather[0].icon);

          setTemp(resJson.main.temp);
          setCity(resJson.name);
          setMin(resJson.main.temp_min);
          setmax(resJson.main.temp_max);
          setHumdity(resJson.main.humidity);
          setDesc(resJson.weather[0].description)
          setCountry(resJson.sys.country);
          setSunrise(timeConverter(resJson.sys.sunrise));
          setSunset(timeConverter(resJson.sys.sunset));
          setTime(dateConverter(resJson.dt));
          setFeels_like(resJson.main.feels_like);
          setSpeed(resJson.wind.speed);
        })

    }
    fetchApi();
  }


  return (
    <div className="app">
      <div className="search">

        <input

          type="search"
          className="inputField"
          onChange={(event) => {
            setSearch(event.target.value);
          }
          }

        />
        <button className="button-86" onClick={handleClick}> Enter   </button>


      </div>
      {!first ? (<div>
        {!found ? (<p>{ }</p>) : (
          <div>
            <div className="container">
              <div className="top">
                <div className="location">
                  <p>{city}</p>
                  <div>
                  </div>

                </div>
                <div className="temp">
                  {temp ? <h1>{temp}°C</h1> : null}
                </div>
                <div className='air__'>
                  <div className="description">
                    {desc ? <p>{desc}</p> : null}
                  </div>
                  <div className='airquality'>  <p>Description Of Air Quality:  </p>  </div>
                </div>
              </div>

              <div className='enclosed'>
                <div className="bottom">

                  <div className="feels">
                    <p className='bold'>{feels_like}°C</p>
                    <p>Feels Like</p>
                  </div>

                  <div className="humidity">
                    <p className='bold'>{humidity}%</p>
                    <p>Humidity</p>
                  </div>
                  <div className="wind">
                    <p className='bold'>{speed} MPH</p>
                    <p>Wind Speed</p>
                  </div>
                </div>
                <div className='side'>
                  <div className='aqi'>
                    <p className='bold'>{aqi}</p>
                    <p>AQI</p>
                  </div>

                  <div className='PollutantDescription'>
                    <p className='bold'>{` Pollutant concentration in μg/`}m<sup>3</sup>  : </p>
                  </div>

                  <div className='so2'>
                    <p className='bold'>{`${so2}`}</p>
                    <p>{`S`}O<sup>2</sup>  </p>

                  </div>

                  <div className='no2'>
                    <p className='bold'> {`${no2}`}</p>
                    <p>{`N`}O<sup>2</sup> </p>
                  </div>

                  <div className='pm10'>
                    <p className='bold'> {`${pm10}`}</p>
                    <p>{`PM10`} </p>
                  </div>

                  <div className='pm2_5'>
                    <p className='bold'>{`${pm2_5}`}</p>
                    <p>{`PM2.5`} </p>
                  </div>

                  <div className='o3'>
                    <p className='bold'>  {`${o3}`}</p>
                    <p>O<sup>3</sup> </p>
                  </div>

                  <div className='co'>
                    <p className='bold'> {`${co}`}</p>
                    <p>{`CO`} </p>
                  </div>





                </div>

              </div>

              {status != null ? (
                <div className='message'>
                  <p className='bold'>{`${status}   : ${message} `}</p>


                </div>) : (<div></div>)

              }

            </div>
            <p className='last'> <b>{` Last Updated : ${time} `}</b></p>
          </div>
        )
        }
      </div>
      ) : (<div> </div>)
      }
    </div>
  );
}

export default App;