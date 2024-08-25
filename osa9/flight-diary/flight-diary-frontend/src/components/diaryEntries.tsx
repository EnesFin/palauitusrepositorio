import Title from './title';
import { DiaryEntryProps } from '../types';
import { useState, useEffect } from 'react';
import { getAll } from '../services/diaries';

const DiaryEntry = () => {
  const [diaries, setDiaries] = useState<DiaryEntryProps[]>([]);

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      const entries = await getAll();
      setDiaries(entries);
    };
    void fetchDiaryEntries();
  }, []);

  return (
    <div>
      <Title title='Diary entries'></Title>
      {diaries.map((p) => (
        <div key={p.id}>
          <h4>{p.date} </h4>
          <p>visibility: {p.visibility}</p>
          <p>weather: {p.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default DiaryEntry;
