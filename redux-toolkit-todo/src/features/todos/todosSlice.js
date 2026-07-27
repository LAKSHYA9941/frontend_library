import { createSlice, nanoid } from '@reduxjs/toolkit'

// A "slice" is a chunk of the overall Redux state, plus the
// reducers (state-update functions) and actions that go with it.
// createSlice auto-generates action creators + action types for us,
// so we don't have to hand-write switch statements or action constants.

const initialState = {
  items: [
    { id: nanoid(), text: 'Learn Redux Toolkit', completed: true },
    { id: nanoid(), text: 'Build a mini project', completed: false },
  ],
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // ADD DATA
    addTodo: {
      reducer(state, action) {
        state.items.push(action.payload)
      },
      // "prepare" lets us format the payload before it hits the reducer
      prepare(text) {
        return { payload: { id: nanoid(), text, completed: false } }
      },
    },

    // UPDATE DATA (edit the text of a todo)
    editTodo(state, action) {
      const { id, text } = action.payload
      const todo = state.items.find((t) => t.id === id)
      if (todo) todo.text = text
    },

    // UPDATE DATA (toggle completed status)
    toggleTodo(state, action) {
      const todo = state.items.find((t) => t.id === action.payload)
      if (todo) todo.completed = !todo.completed
    },

    // DELETE DATA
    deleteTodo(state, action) {
      state.items = state.items.filter((t) => t.id !== action.payload)
    },
  },
})

// Note: Redux Toolkit uses Immer internally, so it LOOKS like we are
// mutating `state` directly (state.items.push, todo.text = ...) but
// under the hood Immer produces a new immutable state object for us.

export const { addTodo, editTodo, toggleTodo, deleteTodo } = todosSlice.actions
export default todosSlice.reducer

// Selectors - functions that know how to pull specific data out of state
export const selectAllTodos = (state) => state.todos.items
