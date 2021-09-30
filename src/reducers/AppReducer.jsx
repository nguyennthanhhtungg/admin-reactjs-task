export default function reducer(state, action) {
  // action = { type, payload }
  switch (action.type) {
    case 'init':
      return action.payload;

    case 'updateCategoryList':
      return {
        ...state,
        categoryList: action.payload.categoryList
      };

    case 'updateSupplierList':
      return {
        ...state,
        supplierList: action.payload.supplierList
      };

    default:
      return state;
  }
}
