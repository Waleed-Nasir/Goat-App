export const API_URLS = {
  BaseURL: "http://202.165.236.164:4000/api/", //########DONE##########//

  //AUHT
  LOGIN: "auth/login/customer", //########DONE##########//
  REGISTER: "auth/register/customer", //########DONE##########//
  FORGOT: "password/email", //########DONE##########//
  UPDATED_PASSWORD: "password/reset", //########DONE##########//

  //HOME
  PRODUCTS: "product", //########DONE##########//
  PRODUCTS_DETAILS: "product/", //########DONE##########//
  CLAIM_FILE: "orders/edit-claim",
  PLACE_ORDER: "orders/place",
  GET_ORDERS: "orders/list/my",
  ORDER_DETAILS: "orders/details", //########DONE##########//
  ///ADDRESS
  ADDRESS: "user/addresses/",
  CATEGORY: "category", //########DONE##########//
  GET_PRODUCTS_BY_CATEGORY: 'product/category',
  //USER
  USER_DETAILS: "auth/user?token=", //USER ID   //######## DONE##########//
  UPDATE_PROFILE: "front/users/update/", //USER ID  //########--------------DONE-------------##########//
  UPDATE_PASSWORD: "front/users/update_password/", //USER ID
};
