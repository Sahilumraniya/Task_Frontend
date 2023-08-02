import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    setTasks: (state, action) => {
      return action.payload;
    },
    addTask: (state, action) => {
      state.push(action.payload);
    },
    updateTask: (state, action) => {
      const { id, status, title, description } = action.payload;
      const taskToUpdate = state.find((task) => task._id === id);
      if (taskToUpdate) {
        taskToUpdate.title = title;
        taskToUpdate.description = description;
        taskToUpdate.status = status;
      }
    },
    deleteTaskFromStore: (state, action) => {
      const idToDelete = action.payload;
      return state.filter((task) => task._id !== idToDelete);
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTaskFromStore } =
  taskSlice.actions;

export default taskSlice.reducer;
