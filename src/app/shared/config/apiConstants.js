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

  GET_BENEFICIARY_LIST: "/orbit-user-recipients/api/recipient",
  SEARCH_BENEFICIARY_LIST: "/orbit-user-recipients/api/recipient/search",
  FETCH_RECIPIENTS_REQUIRED_FIELDS: "/orbit-user-recipients/api/findRequiredFields",
  DELETE_RECIPIENT: "/orbit-user-recipients/api/delteRecipient",
  ADD_RECIPIENTS: "/orbit-user-recipients/api/recipient",
  RECIPIENTS_DELETE: "/orbit-user-recipients/api/recipient",
  RECIPIENTS_FETCH_BY_ID: "/orbit-user-recipients/api/recipient/findById",

  GET_PURPOSE_LIST: "/orbit-user-recipients/api/utility/fetchPurposeOfPayment",

  FETCH_TRANSFER_RATE: "/orbitmoney-afex-exchange-rate/quote",
  TRANSFER_MONEY: "/orbit-afex-transaction/transferMoney",

  FORGOT_PASSWORD_REQUEST: "/orbit-user-authentication/forgotPassword",
  FORGOT_PASSWORD_VALIDATE: "/orbit-user-authentication/validateForgotPassword",
  FORGOT_PASSWORD_CHANGE: "/orbit-user-authentication/changeUserPassword",

  FETCH_BANKS: "/orbit-dcbank-integration/getBankList",
  FETCH_BRANCHES: "/orbit-dcbank-integration/getBranches?branchId=",
  FETCH_DIRECT_DEBIT_ACCOUNTS: "/orbit-dcbank-integration/getBankAccounts?userId=22",
  POST_BANK_DETAILS: "/orbit-dcbank-integration/addCustomerBankDetails",

  FETCH_NOTIFICATIONS: "/orbit-user-dashboard/api/notifications/fetchNotifications?limit=",
  MARK_NOTIFICATIONS: "/orbit-user-dashboard/api/notifications/markAsRead"
};

export default ApiConstants;
