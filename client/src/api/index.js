import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

export const analyzeCV = async (file, jobDescription) => {
  const form = new FormData();
  form.append('file', file);
  if (jobDescription) form.append('job_description', jobDescription);
  const { data } = await api.post('/analyze', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export default api;
