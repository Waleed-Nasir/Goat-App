import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MessageShow, showResponseError } from "../../utils/Constant";
import { loaderVisibility } from "./LoaderSlice";
import AuthService from "../services/AuthServices";

const initialState = {
  accessToken: null,
  isResetPasswordScreen: false,
  isPasswordUpdated: false,
  userID: null,
};

export const login = createAsyncThunk("login", async (body, thunk) => {
  try {
    thunk.dispatch(loaderVisibility(true));
    const response = await AuthService.login(body);
    console.log(response, "response");
    thunk.dispatch(AuthSlice.actions.saveAccessToken(response));
    MessageShow("success", "Success", response.message);
    thunk.dispatch(loaderVisibility(false));
    return thunk.fulfillWithValue(response);
  } catch (error) {
    thunk.dispatch(loaderVisibility(false));
    let err = MessageShow("error", "Error", showResponseError(error));
    return thunk.rejectWithValue(err);
  }
});

export const register = createAsyncThunk("register", async (body, thunk) => {
  try {
    thunk.dispatch(loaderVisibility(true));
    const response = await AuthService.register(body);
    console.log(response, "response");
    thunk.dispatch(AuthSlice.actions.saveAccessToken(response));
    MessageShow("success", "Success", response.message);
    thunk.dispatch(loaderVisibility(false));
    return thunk.fulfillWithValue(response);
  } catch (error) {
    thunk.dispatch(loaderVisibility(false));
    let err = MessageShow("error", "Error", showResponseError(error));
    return thunk.rejectWithValue(err);
  }
});
export const forgot = createAsyncThunk("forgot", async (body, thunk) => {
  try {
    thunk.dispatch(loaderVisibility(true));
    const response = await AuthService.forgot(body);
    thunk.dispatch(AuthSlice.actions.setResetScreen(body.email));
    MessageShow("success", "Success", response.msg);
    thunk.dispatch(loaderVisibility(false));
    return thunk.fulfillWithValue(response);
  } catch (error) {
    thunk.dispatch(loaderVisibility(false));
    console.log(error, "error");
    let err = MessageShow("error", "Error", showResponseError(error));
    return thunk.rejectWithValue(err);
  }
});
export const updatePassword = createAsyncThunk(
  "updatePassword",
  async (body, thunk) => {
    try {
      thunk.dispatch(loaderVisibility(true));
      const response = await AuthService.updatePassword(body);
      thunk.dispatch(AuthSlice.actions.setPasswordUpdated(true));
      MessageShow("success", "Success", response.msg);
      thunk.dispatch(loaderVisibility(false));
      return thunk.fulfillWithValue(response);
    } catch (error) {
      thunk.dispatch(loaderVisibility(false));
      console.log(error, "error");
      let err = MessageShow("error", "Error", showResponseError(error));
      return thunk.rejectWithValue(err);
    }
  }
);

export const DeleteAccount = createAsyncThunk(
  "DeleteAccount",
  async (body, thunk) => {
    try {
      thunk.dispatch(loaderVisibility(true));
      const response = await AuthService.deleteAccount(body.ID);
      body?.CallBack();
      thunk.dispatch(AuthSlice.actions.removeAccessToken());
      MessageShow("success", "Success", response.msg);
      thunk.dispatch(loaderVisibility(false));
      return thunk.fulfillWithValue(response);
    } catch (error) {
      thunk.dispatch(loaderVisibility(false));
      console.log(error, "error");
      let err = MessageShow("error", "Error", showResponseError(error));
      return thunk.rejectWithValue(err);
    }
  }
);

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    saveAccessToken: (state, action) => {
      let payload = action.payload.data;
      state.accessToken = payload.user.token;//"Bearer " +
      state.userID = payload.user.id;
    },
    removeAccessToken: (state, action) => {
      state.accessToken = null;
    },
    setResetScreen: (state, action) => {
      let payload = action.payload;
      state.isResetPasswordScreen = payload;
    },
    setPasswordUpdated: (state, action) => {
      let payload = action.payload;
      state.isPasswordUpdated = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  saveAccessToken,
  removeAccessToken,
  setResetScreen,
  setPasswordUpdated,
} = AuthSlice.actions;
export const getAccessToken = (state) => {
  return state.Auth.accessToken;
};
export default AuthSlice.reducer;