import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

// ✅ Register user
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:4001/api/user/register",
        formData,
        { withCredentials: true }
      );
      return response.data.user;
    } catch (err) {
      const message = err?.response?.data?.msg || "Registration failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ✅ Login user
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:4001/api/user/login",
        formData,
        { withCredentials: true }
      );
      return response.data.user;
    } catch (err) {
      const message = err?.response?.data?.msg || "Login failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ✅ Check current auth state using /check-auth
export const checkAuthUser = createAsyncThunk(
  "auth/check-auth",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:4001/api/user/check-auth",
        { withCredentials: true }
      );
      return response.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue("User not authenticated");
    }
  }
);

// ✅ Logout user
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await axios.post(
        "http://localhost:4001/api/user/logout",
        {},
        { withCredentials: true }
      );
      return true;
    } catch (err) {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // CHECK AUTH
      .addCase(checkAuthUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuthUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(checkAuthUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        state.isLoading = false;
      });
  },
});

export const { setUser, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;


export const filterOptions={
  category:[
    {id:"men", label:"Men"},
    {id:"women", label:"Women"},
    {id:"kids", label:"Kids"},
    {id:"footwear", label:"Footwear"},
    {id:"mobile", label:"Mobile"},
    {id:"electronics", label:"Electronics"},
  ],
 brand: [
    {id:"nike", label:"Nike"},
    {id:"denim", label:"Denim"},
    {id:"h&m", label:"H&M"},
    {id:"puma", label:"Puma"},
    {id:"levi", label:"Levi"},
    {id:"zara", label:"Zara"},
  ]
}


export const sortOptions=[
{id:"price-lowtohigh" ,label:"Price: Low to High"},
{id:"price-hightolow" ,label:"Price: High to Low"},
{id:"title-atoz" ,label:"Price: A to Z"},
{id:"title-ztoa" ,label:"Price: Z to A"},
]
