export const API_URLS = {
  BaseURL: "https://api.goatpure.com/api/", //########DONE##########//

  //AUHT
  LOGIN: "auth/login/rider", //########DONE##########//
  REGISTER: "auth/register/rider", //########DONE##########//
  FORGOT: "password/email", //########DONE##########//
  UPDATED_PASSWORD: "password/reset", //########DONE##########//

  //HOME
  HOME: "orders/list/my", //########DONE##########//
  ORDER_DETAILS: "orders/details", //########DONE##########//
  CLAIM_FILE: 'orders/edit-claim',
  COMPELETE_ORDER: 'orders/mark-as-complete',
  //USER
  USER_DETAILS: "auth/user?token=", //USER ID   //######## DONE##########//
  UPDATE_PROFILE: "auth/users/update", //USER ID  //########--------------DONE-------------##########//
  UPDATE_PASSWORD: "auth/change-password", //USER ID

};