# Redux Toolkit Todo App

A small Todo app built to learn the basics of Redux Toolkit — global state management with a store, a slice, actions, and reducers, wired up to React using `react-redux`.

## Features
- ➕ Add a todo
- ✏️ Update / edit a todo (double-click text, or press the Edit button)
- ✅ Toggle a todo complete/incomplete
- 🗑️ Delete a todo
- 📋 Display all todos with a live "remaining" counter

## Tech Stack
- React 18 + Vite
- Redux Toolkit (`@reduxjs/toolkit`)
- react-redux

## Getting Started
```bash
npm install
npm run dev
```

## Project Structure
```
src/
  app/
    store.js              # configureStore - combines all slices into one store
  features/
    todos/
      todosSlice.js        # state, reducers, actions for todos
      AddTodo.jsx           # form to add a todo (dispatch)
      TodoItem.jsx          # single todo - toggle/edit/delete (dispatch)
      TodoList.jsx          # reads todos from store (useSelector)
  App.jsx
  main.jsx                  # wraps app in <Provider store={store}>
```

## What I learned
See the full write-up in my documentation (linked in my LinkedIn post) covering Redux Toolkit fundamentals: store, slices, reducers, actions, `useSelector`, `useDispatch`, and the data flow between them.
