import DiaryEntry from './components/diaryEntries';
import DiaryForm from './components/diaryForm';
import Title from './components/title';

const App = () => {
  return (
    <div>
      <Title title='Hello'></Title>
      <DiaryForm></DiaryForm>
      <DiaryEntry></DiaryEntry>
    </div>
  );
};
export default App;
