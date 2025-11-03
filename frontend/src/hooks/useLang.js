import { useContext } from 'react';
import { LangContext } from '../context/LangProvider';

const useLang = () => {
  const context = useContext(LangContext);

  if (!context) {
    throw new Error('useLang must be used within a LangProvider');
  }

  return context;
};

export default useLang;
