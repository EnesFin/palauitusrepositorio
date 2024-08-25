import Title from './title';
import { Visibility, Weather } from '../types';
import { SyntheticEvent, useState, useEffect } from 'react';
import { create } from '../services/diaries';
import Notification from './notification';

interface WeatherOption {
  value: Weather;
  label: string;
}

const weatherOption: WeatherOption[] = Object.values(Weather).map((v) => ({
  value: v,
  label: v.toString(),
}));

interface VisibilityOption {
  value: Visibility;
  label: string;
}

const visibilityOption: VisibilityOption[] = Object.values(Visibility).map((v) => ({
  value: v,
  label: v.toString(),
}));

const DiaryForm = () => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState(Visibility.Ok);
  const [weather, setWeather] = useState(Weather.Cloudy);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setTimeout(() => setMessage(''), 5000);
  }, [message]);

  const onWeatherChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (typeof event.target.value === 'string') {
      const value = event.target.value;
      const weather = Object.values(Weather).find((w) => w.toString() === value);
      console.log(weather);
      if (weather) {
        setWeather(weather);
      }
    }
  };

  const onVisibilityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (typeof event.target.value === 'string') {
      const value = event.target.value;
      const visibility = Object.values(Visibility).find((v) => v.toString() === value);
      console.log(visibility);
      if (visibility) {
        setVisibility(visibility);
      }
    }
  };

  const addDiary = async (event: SyntheticEvent) => {
    event.preventDefault();
    const foo = await create({ date, weather, visibility, comment });
    if (typeof foo === 'string') {
      setMessage(foo);
    }
  };

  return (
    <div>
      <Title title='Add new entry'></Title>
      <Notification title={message}></Notification>
      <form onSubmit={addDiary}>
        <div>
          Date
          <input type='date' value={date} onChange={({ target }) => setDate(target.value)} />
        </div>
        <div>
          Visibility
          {visibilityOption.map((option) => (
            <div key={option.label} style={{ display: 'inline' }}>
              <input
                type='radio'
                value={option.value}
                name='visibility'
                onChange={onVisibilityChange}
                id={option.label}
              />
              <label>{option.value}</label>
            </div>
          ))}
        </div>
        <div>
          Weather
          {weatherOption.map((option) => (
            <div key={option.label} style={{ display: 'inline' }}>
              <input
                type='radio'
                value={option.value}
                name='weather'
                onChange={onWeatherChange}
                id={option.label}
              />
              <label>{option.value}</label>
            </div>
          ))}
        </div>
        <div>
          Comment
          <input value={comment} onChange={({ target }) => setComment(target.value)} />
        </div>
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
