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

    case 'addNewSupplier':
      return {
        ...state,
        supplierList: [action.payload, ...state.supplierList]
      };

    case 'updateSupplier':
      return {
        ...state,
        supplierList: state.supplierList.map((supplier) =>
          supplier.supplierId === action.payload.supplierId
            ? {
                ...supplier,
                supplierName: action.payload.supplierName,
                location: action.payload.location,
                logoUrl: action.payload.logoUrl,
                description: action.payload.description
              }
            : supplier
        )
      };

    case 'removeSupplier':
      return {
        ...state,
        supplierList: state.supplierList.filter(
          (supplier) => supplier.supplierId !== action.payload.supplierId
        )
      };

    case 'updateEmployee':
      return {
        ...state,
        employee: action.payload.employee
      };

    default:
      return state;
  }
}
