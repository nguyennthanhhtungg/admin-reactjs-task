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

    case 'addNewCategory':
      return {
        ...state,
        categoryList: [action.payload, ...state.categoryList]
      };

    case 'updateCategory':
      return {
        ...state,
        categoryList: state.categoryList.map((category) =>
          category.categoryId === action.payload.categoryId
            ? {
                ...category,
                categoryName: action.payload.categoryName,
                imageUrl: action.payload.imageUrl,
                active: action.payload.active
              }
            : category
        )
      };

    case 'removeCategory':
      return {
        ...state,
        categoryList: state.categoryList.filter(
          (category) => category.categoryId !== action.payload.categoryId
        )
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
