import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '../note/notesSlice';

const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});

export default store;
