import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api"; // ✅ tumhare api.js wrapper

// ✅ Get all tasks
export const getTasks = createAsyncThunk("tasks/getAll", async (_, thunkAPI) => {
  try {
    const res = await api.get("/tasks");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

// ✅ Create task
export const createTask = createAsyncThunk("tasks/create", async (data, thunkAPI) => {
  try {
    const res = await api.post("/tasks", data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

// ✅ Update task
export const updateTask = createAsyncThunk("tasks/update", async ({ id, updates }, thunkAPI) => {
try{
  
    const res = await api.put(`/tasks/${id}`, updates);
    return res.data;
   
}catch(err){
    return thunkAPI.rejectWithValue(err.response.data);

}
});

// ✅ Delete task
export const deleteTask = createAsyncThunk("tasks/delete", async (id, thunkAPI) => {
  try {
    await api.delete(`/tasks/${id}`);
    return id; // ✅ return id so we can remove from state
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ GET
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch tasks";
      })

      // ✅ CREATE
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
        state.success = true;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to create task";
      })

      // ✅ UPDATE
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        );
        state.success = true;
      })

      // ✅ DELETE
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
        state.success = true;
      });
  },
});

export const { resetSuccess } = taskSlice.actions;
export default taskSlice.reducer;
