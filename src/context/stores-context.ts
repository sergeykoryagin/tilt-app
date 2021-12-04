import { createContext } from 'react';
import { Stores } from 'stores/stores';

export const stores = new Stores();

export const StoresContext = createContext<Stores>(stores);
StoresContext.displayName = 'StoresContext';