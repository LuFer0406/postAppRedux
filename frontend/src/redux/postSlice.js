import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  isLoading: false,
};

// Sesiones asincrónicas

// Obtener un post
export const getPosts = createAsyncThunk(
  "postSlice/getPosts",
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/post`);
      console.log(data.data)
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Guardar un post
export const savePosts = createAsyncThunk(
  "postSlice/savePost",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      await axios.post(`/post`, data);
      dispatch(getPosts());
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Eliminar un post
export const deletePosts = createAsyncThunk(
  "postSlice/deletePost",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`/post/${id}`);
      dispatch(getPosts());
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Actualizar un post
export const updatePosts = createAsyncThunk(
  "postSlice/updatePost",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      await axios.put(`/post/${data._id}`, data);
      dispatch(getPosts());
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getPosts.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      alert(action.payload)
    });

    builder.addCase(savePosts.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(savePosts.fulfilled, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(savePosts.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      alert(action.payload)
    });

    builder.addCase(deletePosts.rejected, (state, action) => {
      console.log(action.payload);
      alert(action.payload)
    });

    builder.addCase(updatePosts.rejected, (state, action) => {
      console.log(action.payload);
      alert(action.payload)
    });
  },
});

export const { setLoading } = postSlice.actions;

export default postSlice.reducer;
