import { EMPLOYEE_ACTION_TYPE } from 'utils/constants';

export default function reducer(state, action) {
  // action = { type, payload }
  switch (action.type) {
    case EMPLOYEE_ACTION_TYPE.INIT:
      return action.payload;

    case EMPLOYEE_ACTION_TYPE.LOCK_EMPLOYEE:
      return {
        ...state,
        employeeList: state.employeeList.map((employee) =>
          employee.employeeId === action.payload.employee.employeeId
            ? { ...employee, isLocked: true }
            : employee
        )
      };

    case EMPLOYEE_ACTION_TYPE.UNLOCK_EMPLOYEE:
      return {
        ...state,
        employeeList: state.employeeList.map((employee) =>
          employee.employeeId === action.payload.employee.employeeId
            ? { ...employee, isLocked: false }
            : employee
        )
      };

    default:
      return state;
  }
}
