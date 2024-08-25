import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import { Patient, Gender, Diagnosis, EntryFormValues } from '../../types';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Dialog,
  FormControl,
  MenuItem,
  Select,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import { Transgender, Female, Male } from '@mui/icons-material/';
import EntryDetails from './EntryDetails';
import AddEntryHospitalForm from './AddEntryHospitalForm';
import axios from 'axios';
import AddEntryOccupationalForm from './AddEntryOccupationalForm';
import AddEntryHealthCheckForm from './AddEntryHealthCheckForm';

interface DiagnoseProps {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: DiagnoseProps) => {
  const [patient, setPatient] = useState<Patient>();
  const { id } = useParams<{ id?: string }>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [entryType, setEntryType] = useState('');
  const [error, setError] = useState<string>();

  const setErrorMessage = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError(undefined);
    }, 5000);
  };

  useEffect(() => {
    const fetchPatientList = async () => {
      const patient = await patientService.getById(id);
      setPatient(patient);
    };
    void fetchPatientList();
  }, [id]);

  if (patient === undefined) {
    return <></>;
  }

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError('');
  };

  const handleChange = (event: SelectChangeEvent) => {
    setEntryType(event.target.value);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    //incase id is undefined
    if (id) {
      try {
        const patient = await patientService.createEntry(values, id);
        setPatient(patient);
        console.log(patient);
        setModalOpen(false);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === 'string') {
            const message = e.response.data.replace('Something went wrong. Error: ', '');
            console.error(message);
            setErrorMessage(message);
          } else {
            setErrorMessage(`${e.response?.data.error}`);
          }
        } else {
          console.error('Unknown error', e);
          setErrorMessage('Unknown error');
        }
      }
    }
  };

  const getPatientGenderIcon = (gender: Gender) => {
    if (gender === Gender.Male) return <Male />;
    if (gender === Gender.Female) return <Female />;
    return <Transgender />;
  };
  console.log(patient.entries);
  return (
    <Box>
      <Typography variant='h5'>
        {patient.name} {getPatientGenderIcon(patient.gender)}
      </Typography>
      <div>ssh: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <Typography variant='h6'>entries</Typography>
      {error ? (
        <Box>
          <Typography variant='h6' sx={{ color: '#c62828' }}>
            {error}
          </Typography>
        </Box>
      ) : null}
      {patient.entries.map((p) => (
        <EntryDetails key={p.id} entry={p}></EntryDetails>
      ))}
      <FormControl fullWidth>
        <Select
          labelId='simple-name-label'
          id='simple-name'
          value={entryType}
          label='Type'
          onChange={handleChange}>
          <MenuItem value={'Health check'}>Health check</MenuItem>
          <MenuItem value={'Hospital'}>Hospital</MenuItem>
          <MenuItem value={'Occupational healthcare'}>Occupational healthcare</MenuItem>
        </Select>
      </FormControl>
      <Button variant='contained' onClick={() => openModal()}>
        Add New Patient
      </Button>
      <Dialog fullWidth={true} open={modalOpen} onClose={() => closeModal}>
        {entryType === 'Hospital' && (
          <AddEntryHospitalForm
            onSubmit={submitNewEntry}
            onCancel={closeModal}></AddEntryHospitalForm>
        )}
        {entryType === 'Occupational healthcare' && (
          <AddEntryOccupationalForm
            onSubmit={submitNewEntry}
            onCancel={closeModal}></AddEntryOccupationalForm>
        )}
        {entryType === 'Health check' && (
          <AddEntryHealthCheckForm
            onSubmit={submitNewEntry}
            onCancel={closeModal}></AddEntryHealthCheckForm>
        )}
      </Dialog>
    </Box>
  );
};

export default PatientPage;
