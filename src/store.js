import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./redux/TaskSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});
