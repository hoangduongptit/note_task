import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  notes: [],
  loading: false,
  error: null,
};

//  data fetching
export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', title: 'Note 1', content: 'This is the content of note 1.' },
        { id: '2', title: 'Note 2', content: 'This is the content of note 2.' },
        { id: '3', title: 'Note 3', content: 'This is the content of note 3.' },
      ]);
    }, 2000); //  delay
  });
});

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addNote, deleteNote } = notesSlice.actions;

export default notesSlice.reducer;
