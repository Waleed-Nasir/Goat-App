import axios from "axios";
import { Store } from "../Store";
import { getAccessToken } from "../slice/AuthSlicer";
import { API_URLS } from "../../utils/End_Point";

const userDetails = async () => {
  const token = getAccessToken(Store.getState());
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  try {
    const result = await axios.get(
      API_URLS.BaseURL + API_URLS.USER_DETAILS + token,
      {
        headers: { Authorization: token },
      }
    );
    return onSuccess(result);
  } catch (error) {
    return onFailure(error);
  }
};

const updateUserDetails = async (params) => {
  const token = getAccessToken(Store.getState());
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  try {
    const result = await axios.post(
      API_URLS.BaseURL + API_URLS.UPDATE_PROFILE,// + params.user_id,
      params.data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return onSuccess(result);
  } catch (error) {
    return onFailure(error);
  }
};
const updateUserPassword = async (params) => {
  const token = getAccessToken(Store.getState());
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };
  console.log(params, "updateUserPassword",token);
  try {
    const result = await axios.post(
      API_URLS.BaseURL + API_URLS.CHANGE_PASSWORD, //+ params.user_id,
      params,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return onSuccess(result);
  } catch (error) {
    return onFailure(error);
  }
};

const getUpdateMyPackage = async (params) => {
  const token = getAccessToken(Store.getState());
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  try {
    const result = await axios.post(
      API_URLS.BaseURL + API_URLS.UPDATE_USER_PACKAGE + params.user_id,
      { id: params.id },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    return onSuccess(result);
  } catch (error) {
    return onFailure(error);
  }
};

const UserService = {
  userDetails,
  updateUserDetails,
  updateUserPassword,
  getUpdateMyPackage,
};

export default UserService;
