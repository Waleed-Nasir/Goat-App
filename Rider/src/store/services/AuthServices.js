import axios from "axios";
import { Store } from "../store";
import { API_URLS } from "../../utils/End_Point";
import { getAccessToken } from "../slice/AuthSlicer";

const login = async (params) => {
  const formData = new FormData();
  formData.append("email", params.email);
  formData.append("password", params.password);

  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  try {
    const result = await axios.post(
      API_URLS.BaseURL + API_URLS.LOGIN,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return onSuccess(result);
  } catch (error) {
    return onFailure(error);
  }
};

const register = async (params) => {
  const formData = new FormData();
  formData.append("name", params.name);
  formData.append("email", params.email);
  formData.append("phone", params.phone);
  formData.append("password", params.password);

  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  try {
    const result = await axios.post(
      API_URLS.BaseURL + API_URLS.REGISTER,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return onSuccess(result);
  } catch (error) {
    return onFailure(error);
  }
};
const forgot = async (params) => {
  const formData = new FormData();
  formData.append("email", params.email);

  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  try {
    const result = await axios.post(
      API_URLS.BaseURL + API_URLS.FORGOT,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return onSuccess(result);
  } catch (error) {
    return onFailure(error);
  }
};
const signOut = async () => {
  const token = getAccessToken(Store.getState());
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  try {
    const result = await axios.post(
      CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.SIGN_OUT,
      null,
      {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return onSuccess(result);
  } catch (error) {
    return onFailure(error);
  }
};

const deleteAccount = async (ID) => {
  const token = getAccessToken(Store.getState());
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  try {
    const result = await axios.post(
      API_URLS.BaseURL + API_URLS.DELETE_ACCOUNT + ID,
      null,
      {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return onSuccess(result);
  } catch (error) {
    return onFailure(error);
  }
};
const updatePassword = async (params) => {
  const formData = new FormData();
  formData.append("token", params.code);
  formData.append("email", params.email);
  formData.append("password", params.password);

  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  try {
    const result = await axios.post(
      API_URLS.BaseURL + API_URLS.UPDATED_PASSWORD,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return onSuccess(result);
  } catch (error) {
    return onFailure(error);
  }
};
const AuthService = {
  login,
  register,
  signOut,
  deleteAccount,
  forgot,
  updatePassword,
};

export default AuthService;