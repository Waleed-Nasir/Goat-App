import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MessageShow, showResponseError } from "../../utils/Constant";
import MainService from "../services/MainServices";
import { loaderVisibility } from "./LoaderSlice";

const initialState = {
  ProductList: [],
  ProductDetail: {},
  OrderList: [],
  address: [],
  CategoriesList: [],
  SelectedCategoriesList: [],
  OrderDetails: {},
  SearchProductList: [],
  //
};

export const getProductList = createAsyncThunk(
  "ProductList",
  async (body, thunk) => {
    try {
      const response = await MainService.ProductList();
      console.log(response, "response");
      thunk.dispatch(HomeSlice.actions.getProductList(response.data.products));
      return thunk.fulfillWithValue(response);
    } catch (error) {
      let err = MessageShow("error", "Error", showResponseError(error));
      return thunk.rejectWithValue(err);
    }
  }
);
export const getCategories = createAsyncThunk(
  "Categories",
  async (body, thunk) => {
    try {
      const response = await MainService.Categories();
      console.log(response, "response");
      thunk.dispatch(HomeSlice.actions.getCategories(response.data.categories));
      return thunk.fulfillWithValue(response);
    } catch (error) {
      let err = MessageShow("error", "Error", showResponseError(error));
      return thunk.rejectWithValue(err);
    }
  }
);
export const getSearchProducts = createAsyncThunk(
  "SearchProducts",
  async (body, thunk) => {
    try {
      const response = await MainService.SearchProduct(body);
      console.log(response, "response");
      thunk.dispatch(
        HomeSlice.actions.getSearchProduct(response.data.products)
      );
      return thunk.fulfillWithValue(response);
    } catch (error) {
      let err = MessageShow("error", "Error", showResponseError(error));
      return thunk.rejectWithValue(err);
    }
  }
);
export const getSelectedCategoriesList = createAsyncThunk(
  "SelectedCategoriesList",
  async (body, thunk) => {
    try {
      thunk.dispatch(loaderVisibility(true));
      const response = await MainService.SelectedCategoriesList(body);
      console.log(response, "response");
      thunk.dispatch(
        HomeSlice.actions.getSelectedCategoriesList(response.data.products)
      );
      thunk.dispatch(loaderVisibility(false));
      return thunk.fulfillWithValue(response);
    } catch (error) {
      thunk.dispatch(loaderVisibility(false));
      let err = MessageShow("error", "Error", showResponseError(error));
      return thunk.rejectWithValue(err);
    }
  }
);

export const getProductDetails = createAsyncThunk(
  "ProductDetails",
  async (body, thunk) => {
    try {
      thunk.dispatch(loaderVisibility(true));
      const response = await MainService.ProductDetails(body);
      console.log(response, "response");
      thunk.dispatch(HomeSlice.actions.getProductDetails(response.data));
      thunk.dispatch(loaderVisibility(false));
      return thunk.fulfillWithValue(response);
    } catch (error) {
      let err = MessageShow("error", "Error", showResponseError(error));
      thunk.dispatch(loaderVisibility(false));
      return thunk.rejectWithValue(err);
    }
  }
);

export const getPlaceOrder = createAsyncThunk(
  "getPlaceOrder",
  async (body, thunk) => {
    try {
      thunk.dispatch(loaderVisibility(true));
      const response = await MainService.PlaceOrder(body.data);
      MessageShow("success", response.message);
      body?.CallBack();
      thunk.dispatch(loaderVisibility(false));
      return thunk.fulfillWithValue(response);
    } catch (error) {
      console.log(error, "error");
      let err = MessageShow("error", "Error", showResponseError(error));
      thunk.dispatch(loaderVisibility(false));
      return thunk.rejectWithValue(err);
    }
  }
);

export const postClaimBottel = createAsyncThunk(
  "ClaimBottel",
  async (body, thunk) => {
    try {
      thunk.dispatch(loaderVisibility(true));
      const response = await MainService.OrderBottelClaim(body);
      console.log(response, "response");
      MessageShow("success", response.message);
      thunk.dispatch(loaderVisibility(false));
      return thunk.fulfillWithValue(response);
    } catch (error) {
      let err = MessageShow("error", "Error", showResponseError(error));
      thunk.dispatch(loaderVisibility(false));
      return thunk.rejectWithValue(err);
    }
  }
);

export const getOrders = createAsyncThunk("getOrders", async (body, thunk) => {
  try {
    thunk.dispatch(loaderVisibility(true));
    const response = await MainService.OrderList();
    console.log(response, "response");
    thunk.dispatch(HomeSlice.actions.getOrders(response.data.orders));
    thunk.dispatch(loaderVisibility(false));
    return thunk.fulfillWithValue(response);
  } catch (error) {
    thunk.dispatch(loaderVisibility(false));

    let err = MessageShow("error", "Error", showResponseError(error));
    return thunk.rejectWithValue(err);
  }
});
export const getOrdersDetails = createAsyncThunk(
  "getOrdersDetails",
  async (body, thunk) => {
    try {
      thunk.dispatch(loaderVisibility(true));
      const response = await MainService.OrderDetails(body);
      console.log(response, "response");

      thunk.dispatch(loaderVisibility(false));
      thunk.dispatch(HomeSlice.actions.getOrdersDetails(response.data.order));
      return thunk.fulfillWithValue(response);
    } catch (error) {
      thunk.dispatch(loaderVisibility(false));

      let err = MessageShow("error", "Error", showResponseError(error));
      return thunk.rejectWithValue(err);
    }
  }
);

export const getAddress = createAsyncThunk("Address", async (body, thunk) => {
  try {
    const response = await MainService.Address(body);
    console.log(response, "response");
    thunk.dispatch(HomeSlice.actions.address(response.data.addresses));
    return thunk.fulfillWithValue(response);
  } catch (error) {
    let err = MessageShow("error", "Error", showResponseError(error));
    return thunk.rejectWithValue(err);
  }
});
export const HomeSlice = createSlice({
  name: "Home",
  initialState: initialState,
  reducers: {
    getProductList: (state, action) => {
      let payload = action.payload;
      state.ProductList = payload;
    },
    getProductDetails: (state, action) => {
      let payload = action.payload;
      state.ProductDetail = payload;
    },
    getOrders: (state, action) => {
      let payload = action.payload;
      state.OrderList = payload;
    },
    address: (state, action) => {
      let payload = action.payload;
      state.address = payload;
    },
    getCategories: (state, action) => {
      let payload = action.payload;
      state.CategoriesList = payload;
    },
    getSelectedCategoriesList: (state, action) => {
      let payload = action.payload;
      state.SelectedCategoriesList = payload;
    },
    getOrdersDetails: (state, action) => {
      let payload = action.payload;
      state.OrderDetails = payload;
    },
    getSearchProduct: (state, action) => {
      let payload = action.payload;
      state.SearchProductList = payload;
    },
  },
});

// export const {  } = HomeSlice.actions;
export default HomeSlice.reducer;
