import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MessageShow, showResponseError } from "../../utils/Constant";
import UserService from "../services/UserServices";
import { loaderVisibility } from "./LoaderSlice";

const initialState = {
  USER_DATA: [],
};

export const getUserData = createAsyncThunk("UserData", async (body, thunk) => {
  try {
    const response = await UserService.userDetails(body);
    thunk.dispatch(UserSlice.actions.getUserDetails(response.data.user));
    console.log(response, "response");
    return thunk.fulfillWithValue(response);
  } catch (error) {
    console.log(error, "error");
    let err = MessageShow("error", "Error", showResponseError(error));
    return thunk.rejectWithValue(err);
  }
});

export const getUpdateUserDetails = createAsyncThunk(
  "UpdateProfile",
  async (body, thunk) => {
    thunk.dispatch(loaderVisibility(true));
    try {
      const response = await UserService.updateUserDetails(body);
      body.callback();
      console.log(response, "response User");
      MessageShow("success", "Profile Updated Successfully");
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

export const updateUserPassword = createAsyncThunk(
  "UpdatePassword",
  async (body, thunk) => {
    thunk.dispatch(loaderVisibility(true));
    try {
      const response = await UserService.updateUserPassword(body);
      console.log(response, "response User");
      if (response.status) {
        body.callback();
        MessageShow("success", "Password Updated Successfully");
      } else {
        MessageShow(
          "error",
          "Error",
          showResponseError(response)
        );
      }

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

export const UserSlice = createSlice({
  name: "USER",
  initialState: initialState,
  reducers: {
    getUserDetails: (state, action) => {
      let payload = action.payload;
      state.USER_DATA = payload;
    },
  },
});

// export const { isVisible } = Main.actions;
export default UserSlice.reducer;
