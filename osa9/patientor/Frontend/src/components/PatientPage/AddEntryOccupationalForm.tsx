import { useState, SyntheticEvent } from 'react';
import { TextField, Grid, Button } from '@mui/material';
import { EntryFormValues } from '../../types';

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryOccupationalForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      date,
      specialist,
      employerName,
      sickLeave: {
        startDate: startDate,
        endDate: endDate,
      },
      type: 'OccupationalHealthcare',
    });
  };

  return (
    <div>
      <form onSubmit={addPatient}>
        <TextField
          label='Description'
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label='Date'
          placeholder='YYYY-MM-DD'
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label='Specialist'
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label='Employer name'
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />
        <TextField
          label='Sick leave start date'
          fullWidth
          value={startDate}
          onChange={({ target }) => setStartDate(target.value)}
        />
        <TextField
          label='Sick leave start end date'
          fullWidth
          value={endDate}
          onChange={({ target }) => setEndDate(target.value)}
        />
        <Grid>
          <Grid item>
            <Button
              color='secondary'
              variant='contained'
              style={{ float: 'left' }}
              type='button'
              onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: 'right',
              }}
              type='submit'
              variant='contained'>
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryOccupationalForm;
