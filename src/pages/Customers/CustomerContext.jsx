import { createContext } from 'react';

const defaultValue = {
  customerList: []
};
const CustomerContext = createContext(defaultValue);

export default CustomerContext;
export { defaultValue };
