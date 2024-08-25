import axios from 'axios';
import { DiaryEntryProps, DiaryEntryFormValues } from '../types';
const baseUrl = '/api/diaries';

interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const create = async (object: DiaryEntryFormValues) => {
  try {
    const { data } = await axios.post<DiaryEntryProps>(`${baseUrl}`, object);
    return data;
  } catch (error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      return error.response?.data;
    } else {
      console.error(error);
    }
  }
};
