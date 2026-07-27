import { configureStore } from '@reduxjs/toolkit'
import todosReducer from '../features/todos/todosSlice'

// configureStore sets up the Redux store.
// It automatically wires up the Redux DevTools and combines
// all our "slices" of state into one root state object.
export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
})
