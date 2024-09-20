"use client";
import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { LiaTemperatureLowSolid } from "react-icons/lia";
import { WiHumidity } from "react-icons/wi";
import { TbWorldLongitude } from "react-icons/tb";
import DateTimeDisplay from "./DateTimeDisplay";
import { SlCalender } from "react-icons/sl";
import { IoLocationOutline } from "react-icons/io5";
import Image from "next/image";
export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedColor, setSelectedColor] = useState("");

  const apiKey = "f1fc0a9bf37ff43da3dcb62f96fb2493";

  const fetchWeather = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
        setIsModalOpen(true);
        setError(null);
        console.table(data);
        const weatherId = data.weather[0].id;
        setLoading(false);
        // const weatherIcon = getWeatherIcon(weatherId) ;
        console.log(weatherId);
      } else {
        setWeather(null);
        enqueueSnackbar("City not found", { variant: "error" });
        setLoading(false);
      }
    } catch (error) {
      enqueueSnackbar("Check your internet connection", { variant: "error" });
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = async (latitude, longitude) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
        setWeather(data);
        setError(null);
        setIsModalOpen(true);
      } else {
        setError("Unable to fetch weather for your location");
        setWeather(null);
      }
    } catch (error) {
      // enqueueSnackbar("Check your internet connection", { variant: 'error' });
      setError("Unable to fetch weather for your location");
    }
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
          fetchWeatherByLocation(latitude, longitude);
        },
        (error) => {
          enqueueSnackbar("Unable to fetch weather for your location", {
            variant: "error",
          });
          setError("Unable to fetch weather for your location");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const getWeatherIcon = (weatherId) => {
    if (weatherId === 800) {
      return "clear.svg";
    } else if (weatherId >= 200 && weatherId <= 232) {
      return "storm.svg";
    } else if (weatherId >= 600 && weatherId <= 622) {
      return "snow.svg";
    } else if (weatherId >= 701 && weatherId <= 781) {
      return "haze.svg";
    } else if (weatherId >= 801 && weatherId <= 804) {
      return "cloud.svg";
    } else if (
      (weatherId >= 500 && weatherId <= 531) ||
      (weatherId >= 300 && weatherId <= 321)
    ) {
      return "rain.svg";
    } else {
      return "unknown.svg";
    }
  };

  const weatherId = weather?.weather?.[0]?.id; // Use optional chaining to avoid errors if weather is null
  const weatherIcon = weatherId ? getWeatherIcon(weatherId) : null;
  console.log(weatherIcon);
  return (
    <main
      className={`sm:flex sm:flex-row flex flex-col justify-center items-center h-screen p-[2rem] gap-9 w-full ${
        selectedColor ? selectedColor : "bg-blue-500"
      }`}
    >
      <div
        className={` rounded-lg shadow-elevated w-full text-center ${
          selectedColor ? selectedColor : "bg-blue-500"
        }`}
      >
        <p className="text-left font-bold text-white text-2xl pt-4 pl-4 mb-4">
          Weather App
        </p>
        <hr className="border-white my-2" />

        <div className="p-4">
          {loading && (
            <p
              className={`w-full shadow-button  hover:opacity-19 text-white font-bold py-4 px-4 rounded ${
                selectedColor ? selectedColor : "bg-blue-500"
              }`}
            >
              fetching weather info....
            </p>
          )}

          <form onSubmit={fetchWeather} className="mb-4">
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 mt-4 focus:outline-none text-black"
            />

            <p className="mb-4 font-bold text-white">OR</p>
            <button
              type="button"
              onClick={detectLocation}
              className={`w-full shadow-button  hover:opacity-19 text-white font-bold py-4 px-4 rounded ${
                selectedColor ? selectedColor : "bg-blue-500"
              }`}
            >
              Location auto-detect
            </button>
          </form>
        </div>

        {isModalOpen && weather && (
          <div
            className={`sm:p-[4rem] p-[0.5rem] fixed inset-0 gap-9 sm:flex sm:flex-row flex flex-col justify-center items-center w-full z-50 ${
              selectedColor ? selectedColor : "bg-blue-500"
            }
          
          `}
          >
            <div
              className={` rounded-lg shadow-elevated w-full flex-col flex justify-center items-center  relative border border-[#FFFFFFCC]  h-full  ${
                selectedColor ? selectedColor : "bg-blue-500"
              }
         
            `}
            >
              <div className="absolute top-0 right-0 w-full ">
                <p className="text-left font-bold text-white text-2xl pt-4 pl-4 mb-4">
                  Weather App
                </p>
                <hr className="border-white my-2 border w-full" />
              </div>
              <button
                className="absolute top-4 right-4 text-gray-700 text-2xl"
                onClick={handleModalClose}
              >
                &times;
              </button>
              <div className="flex flex-col items-center w-full text-white">
                <Image
                  src={weatherIcon}
                  // src="/favicon.png"
                  alt="weather icon"
                  width={100}
                  height={100}
                ></Image>
                <h1 className="font-bold text-[3rem]">
                  {" "}
                  {weather.main.temp}°C
                </h1>
                <p> {weather.weather[0].description}</p>
                <div className="text-[1.5rem] flex items-center justify-center gap-1 text-center font-bold mb-4">
                  <IoLocationOutline /> {weather.name}, {weather.sys.country}
                </div>

                <div className="flex w-full flex-shrink">
                  <div className="border-l-0 border sm:py-5 py-2 px-auto w-[25%] md:w-[25%] sm:w-full flex justify-center items-center text-[12px] sm:text-sm">
                    <LiaTemperatureLowSolid className="w-9 h-9" />{" "}
                    {weather.main.temp}°C <br /> Temp
                  </div>
                  <div
                    className="border bl-none sm:py-5 py-2 px-auto w-[25%] md:w-[25%] sm:w-full
                  flex justify-center items-center text-[12px] sm:text-sm"
                  >
                    <WiHumidity className="w-[3rem] h-[3rem]" />{" "}
                    {weather.main.humidity}% <br /> Humidity
                  </div>
                  <div
                    className="border sm:py-5 py-2 px-auto w-[25%] md:w-[25%] sm:w-full
                  flex justify-center items-center text-[12px] sm:text-sm"
                  >
                    <TbWorldLongitude className="w-9 h-9" /> lon:{" "}
                    {weather.coord.lon}
                    <br /> lat: {weather.coord.lat}
                  </div>
                  <div
                    className="border-r-0 border sm:py-5 py-2 px-auto w-[25%] md:w-[25%] sm:w-full
                  flex justify-center items-center gap-3 text-[7px] sm:text-sm font-bold"
                  >
                    {" "}
                    <SlCalender className="w-9 h-9" />{" "}
                    <DateTimeDisplay className="w-7 h-7" />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`flex sm:flex-col  py-3 px-2 rounded-[2rem] gap-3 shadow-elevated ${
                selectedColor ? selectedColor : "bg-blue-500"
              }`}
            >
              <span
                className="w-2 h-2 sm:w-3 sm:h-3 p-4 sm:p-5 bg-[#ffdd57] rounded-full shadow-elevated"
                onClick={() => setSelectedColor("bg-[#ffdd57]")}
              ></span>
              <span
                className="w-2 h-2 sm:w-3 sm:h-3 p-4 sm:p-5 bg-[#48cae4] rounded-full shadow-elevated"
                onClick={() => setSelectedColor("bg-[#48cae4]")}
              ></span>
              <span
                className="w-2 h-2 sm:w-3 sm:h-3 p-4 sm:p-5 bg-[#0077b6] rounded-full shadow-elevated"
                onClick={() => setSelectedColor("bg-[#0077b6]")}
              ></span>
              <span
                className="w-2 h-2 sm:w-3 sm:h-3 p-4 sm:p-5 bg-[#00b4d8] rounded-full shadow-elevated"
                onClick={() => setSelectedColor("bg-[#00b4d8]")}
              ></span>
              <span
                className="w-2 h-2 sm:w-3 sm:h-3 p-4 sm:p-5 bg-[#9d4edd] rounded-full shadow-elevated"
                onClick={() => setSelectedColor("bg-[#9d4edd]")}
              ></span>
              <span
                className="w-2 h-2 sm:w-3 sm:h-3 p-4 sm:p-5 bg-[#ff6b6b] rounded-full shadow-elevated"
                onClick={() => setSelectedColor("bg-[#ff6b6b]")}
              ></span>
              <span
                className="w-2 h-2 sm:w-3 sm:h-3 p-4 sm:p-5 bg-[#495057] rounded-full shadow-elevated"
                onClick={() => setSelectedColor("bg-[#495057]")}
              ></span>
              <span
                className="w-2 h-2 sm:w-3 sm:h-3 p-4 sm:p-5 bg-[#ff6f00] rounded-full shadow-elevated"
                onClick={() => setSelectedColor("bg-[#ff6f00]")}
              ></span>
            </div>
          </div>
        )}
      </div>
      <div
        className={`flex sm:flex-col  py-3 px-2 rounded-[2rem] gap-3 shadow-elevated ${
          selectedColor ? selectedColor : "bg-blue-500"
        }`}
      >
        <span
          className="w-2 h-2 sm:w-3 sm:h-3 p-4 sm:p-5 bg-[#ffdd57] rounded-full shadow-elevated"
          onClick={() => setSelectedColor("bg-[#ffdd57]")}
        ></span>
        <span
          className="w-2 h-2 sm:w-3 sm:h-3 p-4 sm:p-5 bg-[#48cae4] rounded-full shadow-elevated"
          onClick={() => setSelectedColor("bg-[#48cae4]")}
        ></span>
        <span
          className="w-2 h-2 sm:w-3 sm:h-3 p-4 sm:p-5 bg-[#0077b6] rounded-full shadow-elevated"
          onClick={() => setSelectedColor("bg-[#0077b6]")}
        ></span>
        <span
          className="w-2 h-2 sm:w-3 sm:h-3 p-4 sm:p-5 bg-[#00b4d8] rounded-full shadow-elevated"
          onClick={() => setSelectedColor("bg-[#00b4d8]")}
        ></span>
        <span
          className="w-2 h-2 sm:w-3 sm:h-3 p-4 sm:p-5 bg-[#9d4edd] rounded-full shadow-elevated"
          onClick={() => setSelectedColor("bg-[#9d4edd]")}
        ></span>
        <span
          className="w-2 h-2 sm:w-3 sm:h-3 p-4 sm:p-5 bg-[#ff6b6b] rounded-full shadow-elevated"
          onClick={() => setSelectedColor("bg-[#ff6b6b]")}
        ></span>
        <span
          className="w-2 h-2 sm:w-3 sm:h-3 p-4 sm:p-5 bg-[#495057] rounded-full shadow-elevated"
          onClick={() => setSelectedColor("bg-[#495057]")}
        ></span>
        <span
          className="w-2 h-2 sm:w-3 sm:h-3 p-4 sm:p-5 bg-[#ff6f00] rounded-full shadow-elevated"
          onClick={() => setSelectedColor("bg-[#ff6f00]")}
        ></span>
      </div>
    </main>
  );
}
