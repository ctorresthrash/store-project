import { SESSION_STORAGE_KEY } from '@/constants';
import { redirect } from 'react-router-dom';

export const loader = async () => {
  const token = window?.localStorage.getItem(SESSION_STORAGE_KEY);
  if (!token) {
    return redirect('/login');
  }
  return null;
};
