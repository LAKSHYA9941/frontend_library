import { useSelector } from 'react-redux'
import { selectAllTodos } from './todosSlice'
import TodoItem from './TodoItem'

export default function TodoList() {
  // useSelector reads a piece of data out of the Redux store.
  // Whenever that piece of state changes, this component re-renders.
  const todos = useSelector(selectAllTodos)

  if (todos.length === 0) {
    return <p className="empty">No todos yet. Add one above!</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}
