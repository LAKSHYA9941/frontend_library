# Redux Toolkit — My Learning Documentation

## 1. Introduction
Redux Toolkit (RTK) is the official, recommended way to write Redux. It's a wrapper around plain Redux that removes most of the boilerplate (action types, action creators, switch-case reducers, manual immutability) while keeping the same core idea: **one central store holds your app's state, and the only way to change that state is by dispatching an action.**

## 2. Why Redux Toolkit exists
Plain Redux required a lot of repetitive setup:
- Writing action type strings by hand (`"ADD_TODO"`) and keeping them in sync with reducers.
- Writing switch statements in every reducer.
- Manually spreading state to avoid mutating it (`{...state, items: [...state.items, newItem]}`), which gets messy fast.
- Configuring the store and middleware (like Redux DevTools, thunk) by hand.

Redux Toolkit solves this with:
- `configureStore()` — sets up the store with good defaults (DevTools, middleware) in one line.
- `createSlice()` — generates action types + action creators + a reducer, all from one object.
- Built-in **Immer** — lets you write code that *looks* like direct mutation (`state.items.push(x)`) but Immer converts it into a proper immutable update behind the scenes.

In short: same Redux principles, far less code to write and fewer chances to make mistakes.

## 3. Core Concepts (in my own words)

**Store**
The single object that holds the entire app's state in memory. There's only one store per app. Components don't hold their own copy of this data — they read from the store.

**Slice**
A "slice" of the overall state that belongs to one feature (e.g. `todos`). A slice bundles together:
- the initial state for that feature
- the reducers (functions that describe how state changes)
- auto-generated action creators for each reducer

Instead of a giant single reducer for the whole app, you split state into slices and combine them in the store.

**Reducers**
Plain functions that take the current state + an action, and return the new state. In RTK, reducers live inside `createSlice`. Thanks to Immer, I can write `state.completed = true` instead of manually copying/spreading the whole object.

**Actions**
Plain objects describing "something happened" — e.g. `{ type: "todos/addTodo", payload: "Buy milk" }`. I never write these by hand; `createSlice` auto-generates an action creator function for each reducer (e.g. `addTodo("Buy milk")` builds that object for me).

**useDispatch**
A hook from `react-redux` that gives me the `dispatch` function. Dispatching is the *only* way to trigger a state change — you call `dispatch(someAction())` and Redux takes it from there.

**useSelector**
A hook that lets a component read a piece of state out of the store (e.g. `useSelector(state => state.todos.items)`). Whenever that piece of data changes, the component automatically re-renders.

## 4. Data Flow (how it all connects)
1. User interacts with the UI (types in a box, clicks "Add").
2. Component calls `dispatch(addTodo("text"))`.
3. Redux Toolkit runs the matching reducer inside the slice, producing a new state.
4. The store updates and notifies all subscribed components.
5. Any component using `useSelector` on that data re-renders with the fresh state.

It's a one-way loop: **UI → dispatch(action) → reducer → new state → UI updates.** Nothing skips this cycle — components never mutate state directly.

## 5. Folder Structure I used
```
src/
  app/store.js                 -> configureStore, combines all slices
  features/todos/todosSlice.js -> state + reducers + actions for "todos"
  features/todos/AddTodo.jsx   -> dispatches addTodo
  features/todos/TodoItem.jsx  -> dispatches toggleTodo / editTodo / deleteTodo
  features/todos/TodoList.jsx  -> useSelector to read + display todos
  main.jsx                     -> wraps <App /> in <Provider store={store}>
```
This is the "feature folder" pattern RTK's own docs recommend — each feature owns its slice and its components, instead of scattering reducer logic across the app.

## 6. Important Functions/APIs
| API | Purpose |
|---|---|
| `configureStore()` | Creates the Redux store with sensible defaults |
| `createSlice()` | Generates reducer + actions for one feature |
| `nanoid()` | Generates a unique ID (comes bundled with RTK) |
| `useSelector()` | Read state in a component |
| `useDispatch()` | Get the dispatch function to send actions |
| `<Provider store={store}>` | Makes the store available to the whole React tree |

## 7. Real-world use cases
- Shopping cart state shared across many pages (cart icon, checkout page, product page).
- Auth/session state (logged-in user info) needed in many unrelated components.
- Multi-step forms/wizards where data needs to persist across steps.
- Dashboards where multiple widgets read/write the same filters or data set.

Redux Toolkit is worth it once state needs to be shared across many components that aren't directly related in the component tree — passing props down manually ("prop drilling") gets painful past a certain depth.

## 8. Challenges I faced
- Understanding *why* I "mutate" state directly inside reducers even though Redux is supposed to be immutable — this only clicked once I learned Immer runs underneath `createSlice` and converts my "mutations" into a real immutable update.
- Initially confusing `useSelector`/`useDispatch` with plain React `useState`/`useContext` — the difference is the store is global and outside React's own state system, but reads/writes still trigger React re-renders through these hooks.
- Getting the `<Provider>` placement right in `main.jsx` — if a component using `useSelector` isn't inside `<Provider>`, it throws an error.

## 9. Additional things I explored
- The `prepare` callback in `createSlice`, which lets you transform the input (e.g. plain text) into a full payload object (with an id) before it reaches the reducer.
- Redux DevTools extension — lets you literally see every dispatched action and the resulting state diff, which made debugging much easier than `console.log`.
- Selectors as reusable, exported functions (`selectAllTodos`) instead of writing the same `state.todos.items` inline everywhere.
