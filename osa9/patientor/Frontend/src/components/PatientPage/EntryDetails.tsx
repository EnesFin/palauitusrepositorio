import { Box } from '@mui/material';
import {
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HealthCheckRating,
} from '../../types';
import { LocalHospital, Work, MedicalServices, Favorite } from '@mui/icons-material/';

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <Box sx={{ border: 1 }}>
      <div>
        {entry.date} <LocalHospital />
      </div>
      <div>{entry.description}</div>
      <div>diagnose by {entry.specialist}</div>
    </Box>
  );
};

const OccupationalHealthcareEntryDetails = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  return (
    <Box sx={{ border: 1 }}>
      <div>
        {entry.date} <Work /> {entry.employerName}
      </div>
      <div>{entry.description}</div>
      <div></div>
      <div>diagnose by {entry.specialist}</div>
    </Box>
  );
};

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  const getHealthColor = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return '#00ff00';
      case HealthCheckRating.LowRisk:
        return '#ffff00';
      case HealthCheckRating.HighRisk:
        return '#FFA500';
      case HealthCheckRating.CriticalRisk:
        return '#FF0000';
    }
  };

  const healthColor = getHealthColor(entry.healthCheckRating);

  return (
    <Box sx={{ border: 1 }}>
      <div>
        {entry.date} <MedicalServices />
      </div>
      <div>{entry.description}</div>
      <Favorite style={{ color: healthColor }} />
      <div>diagnose by {entry.specialist}</div>
    </Box>
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryDetails entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckEntryDetails entry={entry} />;
  }

  return <div></div>;
};

export default EntryDetails;
