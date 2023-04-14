import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MessageShow, showResponseError } from "../../utils/Constant";
import MainService from "../services/MainServices";
import { loaderVisibility } from "./LoaderSlice";

const initialState = { OrderList: [], OrderDetails: {} };

export const getOrderList = createAsyncThunk("OrderList", async (body, thunk) => {
  try {
    const response = await MainService.OrderList();
    console.log(response, "response");
    thunk.dispatch(HomeSlice.actions.getOrderList(response.data.orders));
    return thunk.fulfillWithValue(response);
  } catch (error) {
    let err = MessageShow("error", "Error", showResponseError(error));
    return thunk.rejectWithValue(err);
  }
});

export const getOrderDetails = createAsyncThunk("OrderDetails", async (body, thunk) => {
  try {
    thunk.dispatch(loaderVisibility(true));
    const response = await MainService.OrderDetails(body);
    console.log(response, "response");
    thunk.dispatch(HomeSlice.actions.getOrderDetails(response.data.order));
    thunk.dispatch(loaderVisibility(false));
    return thunk.fulfillWithValue(response);
  } catch (error) {
    let err = MessageShow("error", "Error", showResponseError(error));
    thunk.dispatch(loaderVisibility(false));
    return thunk.rejectWithValue(err);
  }
});

export const postClaimBottel = createAsyncThunk("ClaimBottel", async (body, thunk) => {
  try {
    thunk.dispatch(loaderVisibility(true));
    const response = await MainService.OrderBottelClaim(body);
    console.log(response, "response");
    MessageShow('success', response.message)
    thunk.dispatch(loaderVisibility(false));
    return thunk.fulfillWithValue(response);
  } catch (error) {
    let err = MessageShow("error", "Error", showResponseError(error));
    thunk.dispatch(loaderVisibility(false));
    return thunk.rejectWithValue(err);
  }
});

export const HomeSlice = createSlice({
  name: "Home",
  initialState: initialState,
  reducers: {
    getOrderList: (state, action) => {
      let payload = action.payload;
      (state.OrderList = payload);
    },
    getOrderDetails: (state, action) => {
      let payload = action.payload;
      (state.OrderDetails = payload);
    },
  },
});

// export const {  } = HomeSlice.actions;
export default HomeSlice.reducer;
