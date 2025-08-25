import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const registerUser = createAsyncThunk("auth/register", async (data, thunkAPI) => {
  try {
    const res = await api.post("/auth/register", data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const loginUser = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const res = await api.post("/auth/login", data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await api.post("/auth/logout");
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
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
    resetAuthState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.success = true; // ✅ अब success true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.success = false;
      })

      // LOGIN
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.success = true;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { resetSuccess, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
 