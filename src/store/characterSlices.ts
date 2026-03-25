import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCharactersWithImageUrls } from "../services/swapi";
import { Person } from "../types";

export const getCharacters = createAsyncThunk(
  "characters/getCharacters",
  async (page: number = 1) => {
    return await fetchCharactersWithImageUrls(page);
  },
);

interface State {
  characters: Person[];
  loading: boolean;
  refreshing: boolean;
  page: number;
  hasMore: boolean;
  error: string | null;
}

const initialState: State = {
  characters: [],
  loading: false,
  refreshing: false,
  page: 1,
  hasMore: true,
  error: null,
};

const characterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCharacters.pending, (state, action) => {
        if (action.meta.arg === 1) {
          state.refreshing = true;
        } else {
          state.loading = true;
        }
      })

      .addCase(getCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.characters = action.payload;
      })

      .addCase(getCharacters.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong";
      });
  },
});

export default characterSlice.reducer;
