import { useSelector } from 'react-redux'
import { selectAllTodos } from './features/todos/todosSlice'
import AddTodo from './features/todos/AddTodo'
import TodoList from './features/todos/TodoList'
import './App.css'

export default function App() {
  const todos = useSelector(selectAllTodos)
  const remaining = todos.filter((t) => !t.completed).length

  return (
    <div className="app">
      <h1>Redux Toolkit Todo App</h1>
      <p className="subtitle">{remaining} task(s) remaining</p>
      <AddTodo />
      <TodoList />
    </div>
  )
}
