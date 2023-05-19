import * as React from 'react';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [location, setLocation] = useState({
    latitude: 'nowhere',
    longitude: 'nowhere',
  });
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [icon, setIcon] = useState('');
  const [unit, setUnit] = useState('C');
  const [tempC, setTempC] = useState(0);
  const tempF = (tempC * 9) / 5 + 32;

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    if (location.latitude !== 'nowhere' && location.longitude !== 'nowhere') {
      fetchWeather();
    }
  }, [location]);

  function fetchLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  async function fetchWeather() {
    try {
      const response = await fetch(
        `https://weather-proxy.freecodecamp.rocks/api/current?lon=${location.longitude}&lat=${location.latitude}`
      );
      if (!response.ok) {
        throw new Error('Weather data not available. Please try again later');
      }
      const data = await response.json();
      const { name, sys, main, weather } = data;
      if (!name || !sys || !main || !weather || !weather[0].icon) {
        throw new Error('Weather data is incomplete. Please try again later.');
      }
      const { country } = sys;
      const { temp } = main;
      const { icon } = weather[0];

      setCity(name);
      setCountry(country);
      setTempC(temp);
      setIcon(icon);
    } catch (error) {
      console.error('Error fetching weather: ', error);
    }
  }

  function handleClick() {
    setUnit(unit === 'C' ? 'F' : 'C');
  }

  const temp = unit === 'C' ? tempC : tempF;

  return (
    <footer className="flex items-center justify-between w-full h-20 bg-gradient-to-r from-emerald-700 via-yellow-400 to-indigo-800 sticky bottom-0">
      <div className="flex items-center ml-5 space-x-2 text-slate-200 text-lg">
        <h1>
          {city}, {country}
        </h1>
        <img src={icon} alt="Weather Icon" />
        <span className="mr-4 text-lg font-medium text-gray-900 dark:text-gray-300">
          {temp.toFixed(0)}° {unit}
        </span>
      </div>
      <div className="flex items-center mr-12 space-x-2">
        <label className="relative inline-flex items-center cursor-pointer">
          <span className="mr-1 text-s font-medium text-gray-900 dark:text-gray-300">
            C°
          </span>
          <div
            className={`toggle-toggle w-12 h-6 relative rounded-full bg-gray-200 ${
              unit === 'F' ? 'bg-emerald-600' : 'bg-gray-400'
            }`}
          >
            <input
              type="checkbox"
              className="toggle-checkbox absolute w-0 h-0 opacity-0"
              checked={unit === 'F'}
              onChange={handleClick}
            />
            <div
              className={`toggle-slider absolute w-6 h-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in ${
                unit === 'F' ? 'translate-x-full' : 'translate-x-0'
              }`}
            ></div>
          </div>
          <span className="ml-1 text-s font-medium text-gray-900 dark:text-gray-300">
            F°
          </span>
        </label>
      </div>
    </footer>
  );
}
