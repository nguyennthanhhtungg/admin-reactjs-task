import { createContext } from 'react';

const defaultValue = {
  employee: {},
  categoryList: [],
  supplierList: []
};

const AppContext = createContext(defaultValue);

export { AppContext, defaultValue };
