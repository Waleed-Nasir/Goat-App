import { createSlice } from "@reduxjs/toolkit";

export const LoaderSlice = createSlice({
  name: "Loader",
  initialState: { isVisible: false,isShowAdd:false },
  reducers: {
    loaderVisibility: (state, action) => {
      state.isVisible = action.payload;
    },
    showAddVisibility: (state, action) => {
      state.isShowAdd = action.payload;
    },
  },
});

export const { loaderVisibility,showAddVisibility } = LoaderSlice.actions;
export default LoaderSlice.reducer;
