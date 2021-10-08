import { CUSTOMER_ACTION_TYPE } from 'utils/constants';

export default function reducer(state, action) {
  // action = { type, payload }
  switch (action.type) {
    case CUSTOMER_ACTION_TYPE.INIT:
      return action.payload;

    case CUSTOMER_ACTION_TYPE.LOCK_CUSTOMER:
      return {
        ...state,
        customerList: state.customerList.map((customer) =>
          customer.customerId === action.payload.customer.customerId
            ? { ...customer, isLocked: true }
            : customer
        )
      };

    case CUSTOMER_ACTION_TYPE.UNLOCK_CUSTOMER:
      return {
        ...state,
        customerList: state.customerList.map((customer) =>
          customer.customerId === action.payload.customer.customerId
            ? { ...customer, isLocked: false }
            : customer
        )
      };

    default:
      return state;
  }
}
