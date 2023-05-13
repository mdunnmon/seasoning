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
    <footer className="flex items-center justify-end absolute bottom-0 w-full h-20 bg-gradient-to-r from-emerald-700 via-yellow-400 to-indigo-800">
      <div className="ml-auto flex items-center space-x-2 mr-4 text-slate-200 text-lg">
        <h1>
          {city}, {country}
        </h1>
        <img src={icon} />
        <button
          className="border rounded px-1 py-0.25 hover:text-white hover:bg-gradient-to-r from-emerald-700 to-emerald-600"
          onClick={handleClick}
        >
          {temp.toFixed(0)}° {unit}
        </button>
      </div>
    </footer>
  );
}
