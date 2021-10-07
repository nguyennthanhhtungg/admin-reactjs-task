export default function reducer(state, action) {
  // action = { type, payload }
  switch (action.type) {
    case 'init':
      return {
        employeeList: action.payload.employeeList
      };

    default:
      return state;
  }
}
