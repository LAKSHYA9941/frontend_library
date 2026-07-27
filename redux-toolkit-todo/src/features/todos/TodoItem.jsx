import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleTodo, deleteTodo, editTodo } from './todosSlice'

export default function TodoItem({ todo }) {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)

  const saveEdit = () => {
    const trimmed = draft.trim()
    if (trimmed) dispatch(editTodo({ id: todo.id, text: trimmed }))
    setIsEditing(false)
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch(toggleTodo(todo.id))}
      />

      {isEditing ? (
        <input
          className="edit-input"
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
        />
      ) : (
        <span onDoubleClick={() => setIsEditing(true)}>{todo.text}</span>
      )}

      <div className="actions">
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
      </div>
    </li>
  )
}
