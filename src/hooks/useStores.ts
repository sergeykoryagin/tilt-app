import { useContext } from 'react';
import { StoresContext } from 'context/stores-context';
import { Stores } from 'stores/stores';

export const useStores = () => useContext<Stores>(StoresContext);