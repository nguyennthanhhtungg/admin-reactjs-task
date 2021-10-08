import { createContext } from 'react';

const defaultValue = {
  employeeList: []
};
const EmployeeContext = createContext(defaultValue);

export default EmployeeContext;
export { defaultValue };
