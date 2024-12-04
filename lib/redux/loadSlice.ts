// store/loadSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const userFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("first");
    if (storedUser) {
      return JSON.parse(storedUser);
    }
  }
  return false;
};

const initialState: boolean = userFromLocalStorage();

const loadSlice = createSlice({
  name: "load",
  initialState,
  reducers: {
    setLoad(state, action: PayloadAction<boolean>) {
      return action.payload;
    },
  },
});

export const selectLoad = (state: { load: boolean }) => state.load;
export const { setLoad } = loadSlice.actions;
export default loadSlice.reducer;
