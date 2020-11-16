const ApiConstants = {
  SIGN_UP: "/orbit-user-authentication/signup",
  ACTIVATE_USER: "/orbit-user-authentication/activate",
  SIGN_IN: "/orbit-user-authentication/login",
  FETCH_BALANCE: "/orbit-user-dashboard/fetchBalance",
  FETCH_TRANSACTIONS: "/orbit-user-dashboard/fetchTransactions?",
  SEARCH_TRANSACTIONS: "/orbit-user-dashboard/searchTransactions?",
  EXPORT_AS_PDF: "/orbit-user-dashboard/exportTransactionsAsPdf",
  FETCH_DOCUMENTS: "/orbit-user-documents/fetchDocuments",
  FETCH_DOCUMENT: "/orbit-user-documents/fetchDocument/",
  PUSH_DOCUMENT: "/orbit-user-documents/pushUserDocument",
  UPDATE_DOCUMENT: "/orbit-user-documents/updateUserDocument",

  FETCH_COUNTRIES: "/orbit-lookups/fetchCountries",
  FETCH_PROVINCES: "/orbit-lookups/fetchStates?countryId=",
  FETCH_CITIES: "/orbit-lookups/fetchCities?stateId=",
  FETCH_PERSONAL_ACCOUNT_DETAILS: "/orbit-user-management/api/personalAccount",
  UPDATE_PERSONAL_ACCOUNT_DETAILS: "/orbit-user-management/api/personalAccount",
  CHANGE_PASSWORD: "/orbit-user-management/api/password",
  DELETE_ACCOUNT: "/orbit-user-management/api/account",
};

export default ApiConstants;
