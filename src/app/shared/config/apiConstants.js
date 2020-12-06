const ApiConstants = {
  SIGN_UP: "/orbit-user-authentication/signup",
  ACTIVATE_USER: "/orbit-user-authentication/activate",
  SIGN_IN: "/orbit-user-authentication/login",

  FETCH_BALANCE: "/orbit-user-dashboard/api/balance",
  FETCH_TRANSACTIONS: "/orbit-user-dashboard/api/dashboard/fetchTransactions",
  SEARCH_TRANSACTIONS: "/orbit-user-dashboard/api/dashboard/fetchTransactions",
  EXPORT_AS_PDF: "/orbit-user-dashboard/api/dashboard/exportTransactionsAsPdf",
  FETCH_DOCUMENTS: "/orbit-user-documents/api/document/fetchDocuments",
  FETCH_DOCUMENT: "/orbit-user-documents/api/document/fetchDocument/",
  PUSH_DOCUMENT: "/orbit-user-documents/api/document/pushDocument",
  UPDATE_DOCUMENT: "/orbit-user-documents/api/document/updateUserDocument",

  FETCH_COUNTRIES: "/orbit-lookups/fetchCountries",
  FETCH_PROVINCES: "/orbit-lookups/fetchStates",
  FETCH_CITIES: "/orbit-lookups/fetchCities",
  FETCH_CATEGORIES: "/orbit-lookups/fetchCategories",
  FETCH_SUB_CATEGORIES: "/orbit-lookups/fetchSubCategories",
  FETCH_NUMBER_OF_TRANSACTIONS: "/orbit-lookups/fetchNumberOfTransactionPerMonth",
  FETCH_VALUE_OF_TRANSACTIONS: "/orbit-lookups/fetchValueTransactionPerMonth",
  FETCH_OCCUPATION_GROUPS: "/orbit-lookups/fetchOccupationGroups",
  FETCH_OCCUPATION: "/orbit-lookups/fetchOccupation",
  FETCH_CURRENCY_LIST: "/orbit-lookups/fetchCurrencies",

  FETCH_PERSONAL_ACCOUNT_DETAILS: "/orbit-user-management/api/personalAccount",
  UPDATE_PERSONAL_ACCOUNT_DETAILS: "/orbit-user-management/api/personalAccount",
  CHANGE_PASSWORD: "/orbit-user-management/api/password",
  DELETE_ACCOUNT: "/orbit-user-management/api/account",

  GET_CUSTOMER_ACCOUNTS: "/orbit-user-management/api/account",
  SWITCH_CUSTOMER_ACCOUNTS: "/orbit-user-management/api/account/switchBusinessAccount",

  CREATE_BUSINESS_ACCOUNT: "/orbit-user-management/api/businessAccount",
  GET_BUSINESS_ACCOUNT_DETAILS: "/orbit-user-management/api/businessAccount",
  UPDATE_BUSINESS_ACCOUNT: "/orbit-user-management/api/businessAccount",
  PUSH_BUSINESS_DOCUMENT: "/orbit-user-documents/api/document/pushBusinessDocument",

  FETCH_TRANSFER_RATE: "/orbitmoney-afex-exchange-rate/quote",
  TRANSFER_MONEY: "/orbit-afex-transaction/transferMoney",
};

export default ApiConstants;
