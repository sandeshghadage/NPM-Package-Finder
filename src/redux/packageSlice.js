import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export const allPackagesSlice = createSlice({
  name: "package",
  initialState: {
    packages: [],
  },

  reducers: {
    addPackages: (state, action) => {
      const data = action.payload;
      const finalData = data.map((ele) => {
        const obj = { id: nanoid(), name: ele.package.name };
        return obj;
      });
      state.packages = finalData;
    },
  },
});

export const { addPackages } = allPackagesSlice.actions;

export default allPackagesSlice.reducer;
