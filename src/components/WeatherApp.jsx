import React from "react";
import sunny from "../assets/Images/sunny.png";
import cloudy from "../assets/Images/cloudy.png";
import rainy from "../assets/Images/rainy.png";
import snowy from "../assets/Images/snowy.png";
import { useState,useEffect } from "react";




function WeatherApp() {
    const [data, setdata] = useState({})
    const [location, setlocation] = useState("")
  const api_key = "fa479753da240669b5391ad8fe7e5611";

  

  useEffect(() => {
    const fetchDefaultWeather = async()=>{
      const defaultLocation =  "Patna"
      const url = `https://api.openweathermap.org/data/2.5/weather?
q=${defaultLocation}&units=Metric&appid=${api_key}`;
  const res = await fetch(url)
  const defaulthData = await res.json();
  console.log(defaulthData)
  setdata(defaulthData)
  setlocation("")
    }
  
    fetchDefaultWeather()
  }, [])

  const handleInputChange =(e)=>{
    setlocation(e.target.value)
  }

  const search = async () => {
    if(location.trim() !== ""){
    const url = `https://api.openweathermap.org/data/2.5/weather?
q=${location}&units=Metric&appid=${api_key}`;

    const res = await fetch(url)
    const searchData = await res.json();
    if(searchData.cod !==200){
        setdata({notFound: true})
    }else{
        console.log(searchData)
        setdata(searchData)
        setlocation("")
    }
   
    }
    else{
        alert("Please Enter Any Location")
    }
  };

  const handleKeyDown=(e)=>{
    if(e.key=== "Enter"){
        search()
    }
  }

  const weatherImages = {
    clear :sunny,
    smoke:cloudy,
    clouds:cloudy,
    rain:rainy,
    snow:snowy,
    haze:cloudy,
    mist:cloudy
  }

  const weatherImage = data.weather ? 
  weatherImages[data.weather[0].main.toLowerCase()] : null;

  const backgroundImages = {
    clear :  ' linear-gradient(to right  , #f3b07c, #fcd283)',
    clouds : '  linear-gradient(to right  , #57b6d4, #71eeec)',
    rain : '  linear-gradient(to right  , #5bc8fb, #80baff)',
    snow : '  linear-gradient(to right  , #aff2ff, #fff)',
    haze : '  linear-gradient(to right  , #57b6d4, #71eeec)',
    mist : '  linear-gradient(to right  , #57b6d4, #71eeec)',
  }

  const backgroundImage = data.weather?
  backgroundImages[data.weather[0].main.toLowerCase()] :'linear-gradient(to right  , #f3b07c, #fcd283)';
  
  
  const currentDate = new Date();
  const daysOfWeek = ["Sun","Mon","Tues","Wed","Thu","Fri","Sat"]
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const dayoffWeek = daysOfWeek[currentDate.getDay()]
  const month= months[currentDate.getMonth()]
  const dayoffMonth = currentDate.getDate()

  const formatedDate = `${dayoffWeek},${dayoffMonth},${month}`


  return (
    <div className="container" style={{backgroundImage}}>
      <div className="weather-app" style={{backgroundImage
        : backgroundImage && backgroundImage.replace ? backgroundImage.replace
        ("to right","to top"):null
      }}>
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot"></i>
            <div className="location">{data.name}</div>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Enter Location"
            value={location}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            name="" id="" />
            <i className="fa-solid fa-magnifying-glass" 
            onClick={search}
            ></i>
          </div>
        </div>
        {data.notFound?(
            <div className="not-found">Not Found</div>
        ):(
            <><div className="weather">
            <img src={weatherImage} alt="Sunny" />
            <div className="weather-type">{data.weather ? 
            data.weather[0].main:null}</div>
            <div className="temp">{data.main ?`${Math.floor((data.main.temp))}°`:null}</div>
          </div>
          <div className="weather-date">
            <p>{formatedDate}</p>
          </div>
          <div className="weather-data">
            <div className="humidity">
              <div className="data-name">Humidity</div>
              <i className="fa-solid fa-droplet"></i>
              <div className="data">{data.main? `${data.main.humidity}%`:null}</div>
            </div>
            <div className="wind">
              <div className="data-name">Wind</div>
              <i className="fa-solid fa-wind"></i>
              <div className="data">{data.wind? `${data.wind.speed}KMPH`:null}</div>
            </div>
          </div></>
        )}
       
      </div>
    </div>
  );

  
}

export default WeatherApp;
