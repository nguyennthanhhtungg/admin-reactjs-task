import { createContext } from 'react';

const defaultValue = {
  categoryList: [],
  supplierList: []
};

const AppContext = createContext(defaultValue);

export { AppContext, defaultValue };
