import React, { useState, useEffect } from 'react';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    if (event.target.value === '') {
      setCountries([]);
    } else {
      //"https://studies.cs.helsinki.fi/restcountries/api/" Koska se antaa virheitä GET-operaatioissa, käytettiin vaihtoehtoista dataosoitetta.
      fetch(`https://restcountries.com/v3.1/name/${event.target.value}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data.status === 404) {
            throw new Error('Country not found');
          }
          setCountries(data);
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
    }
  };

  return (
    <div>
      find countries <input value={search} onChange={handleSearchChange} />
      <Countries countries={countries} />
    </div>
  );
};

const Country = ({ country }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [weather, setWeather] = useState(null);

  const handleShowInfo = () => {
    setShowInfo(!showInfo);
  };

  useEffect(() => {
    if (showInfo) {
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=ba83b9dca87bf634d3b635df50f8b271&units=metric`)
        .then(response => response.json())
        .then(data => setWeather(data));
    }
  }, [showInfo, country]);

  if (showInfo) {
    return (
      <div>
        <h1>{country.name.common} <button onClick={handleShowInfo}>hide</button></h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h2>languages</h2>
        <ul>
          {Object.values(country.languages).map((language, i) => <li key={i}>{language}</li>)}
        </ul>
        <img src={country.flags.png} alt={`flag of ${country.name}`} width="200" />
        {weather && weather.main && (
  <div>
    <h2>Weather in {country.capital}</h2>
    <p>temperature: {weather.main.temp} Celcius</p>
    <p>wind: {weather.wind.speed} m/s</p>
  </div>
)}

      </div>
    );
  }

  return (
    <div>
      {country.name.common} <button onClick={handleShowInfo}>show</button>

    </div>
  );
};

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />;
  } else {
    return (
      <div>
        {countries.map(country => <Country key={country.cca3} country={country} />)}
      </div>
    );
  }
};

export default App;
