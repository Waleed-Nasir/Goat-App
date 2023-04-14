import axios from "axios";
import { Store } from "../store";
import { API_URLS } from "../../utils/End_Point";
import { getAccessToken } from "../slice/AuthSlicer";

const OrderList = async (params = "") => {
  const token = getAccessToken(Store.getState());
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  try {
    const result = await axios.get(API_URLS.BaseURL + API_URLS.HOME, {
      headers: { Authorization: "Bearer " + token },
    });
    return onSuccess(result);
  } catch (error) {
    return onFailure(error);
  }
};

const OrderDetails = async (params = "") => {
  const token = getAccessToken(Store.getState());
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  try {
    const result = await axios.post(API_URLS.BaseURL + API_URLS.ORDER_DETAILS, params, {
      headers: { Authorization: "Bearer " + token },
    });
    return onSuccess(result);
  } catch (error) {
    return onFailure(error);
  }
};

const OrderBottelClaim = async (params = "") => {
  const token = getAccessToken(Store.getState());
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  try {
    const result = await axios.post(API_URLS.BaseURL + API_URLS.CLAIM_FILE, params, {
      headers: { Authorization: "Bearer " + token },
    });
    return onSuccess(result);
  } catch (error) {
    return onFailure(error);
  }
};

const MainService = {
  OrderList,
  OrderDetails,
  OrderBottelClaim
};

export default MainService;
