import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MessageShow, showResponseError } from "../../utils/Constant";
import MainService from "../services/MainServices";

const initialState = { OrderList: [], getMyFavList: {} };

export const getOrderList = createAsyncThunk("Home", async (body, thunk) => {
  try {
    const response = await MainService.OrderList();
    console.log(response, "response");
    thunk.dispatch(HomeSlice.actions.getHomeCategories(response.data.orders));
    return thunk.fulfillWithValue(response);
  } catch (error) {
    let err = MessageShow("error", "Error", showResponseError(error));
    return thunk.rejectWithValue(err);
  }
});
// title,
//   image,

export const HomeSlice = createSlice({
  name: "Home",
  initialState: initialState,
  reducers: {
    getHomeCategories: (state, action) => {
      let payload = action.payload;
      (state.OrderList = payload);
    },
  },
});

export const { handleLocalFave } = HomeSlice.actions;
export default HomeSlice.reducer;
