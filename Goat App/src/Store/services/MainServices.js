import axios from "axios";
import { Store } from "../Store";
import { API_URLS } from "../../utils/End_Point";
import { getAccessToken } from "../slice/AuthSlicer";



const SelectedCategoriesList = async (params = "") => {
  const token = getAccessToken(Store.getState());
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  try {
    const result = await axios.post(API_URLS.BaseURL + API_URLS.GET_PRODUCTS_BY_CATEGORY, { category: params }, {
      headers: { Authorization: "Bearer " + token },
    });
    return onSuccess(result);
  } catch (error) {
    return onFailure(error);
  }
};

const Categories = async (params = "") => {
  const token = getAccessToken(Store.getState());
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  try {
    const result = await axios.get(API_URLS.BaseURL + API_URLS.CATEGORY, {
      headers: { Authorization: "Bearer " + token },
    });
    return onSuccess(result);
  } catch (error) {
    return onFailure(error);
  }
};
const ProductList = async (params = "") => {
  const token = getAccessToken(Store.getState());
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  try {
    const result = await axios.get(API_URLS.BaseURL + API_URLS.PRODUCTS, {
      headers: { Authorization: "Bearer " + token },
    });
    return onSuccess(result);
  } catch (error) {
    return onFailure(error);
  }
};

const ProductDetails = async (params = "") => {
  const token = getAccessToken(Store.getState());
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  try {
    const result = await axios.get(
      API_URLS.BaseURL + API_URLS.PRODUCTS_DETAILS + params,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return onSuccess(result);
  } catch (error) {
    return onFailure(error);
  }
};
const PlaceOrder = async (params = "") => {
  const token = getAccessToken(Store.getState());
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  try {
    const result = await axios.post(
      API_URLS.BaseURL + API_URLS.PLACE_ORDER,
      params,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
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
    const result = await axios.post(
      API_URLS.BaseURL + API_URLS.CLAIM_FILE,
      params,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return onSuccess(result);
  } catch (error) {
    return onFailure(error);
  }
};

const OrderList = async (params = "") => {
  const token = getAccessToken(Store.getState());
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  try {
    const result = await axios.get(API_URLS.BaseURL + API_URLS.GET_ORDERS, {
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
    const result = await axios.post(
      API_URLS.BaseURL + API_URLS.ORDER_DETAILS,
      params,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return onSuccess(result);
  } catch (error) {
    return onFailure(error);
  }
};

const Address = async (user_id) => {
  const token = getAccessToken(Store.getState());
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  try {
    const result = await axios.get(
      API_URLS.BaseURL + API_URLS.ADDRESS + user_id,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return onSuccess(result);
  } catch (error) {
    return onFailure(error);
  }
};
const MainService = {
  ProductList,
  ProductDetails,
  PlaceOrder,
  OrderBottelClaim,
  OrderList,
  OrderDetails,
  Address,
  Categories,
  SelectedCategoriesList
};

export default MainService;
