import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from './todosSlice'

export default function AddTodo() {
  const [text, setText] = useState('')
  // useDispatch gives us the "dispatch" function - the only way
  // to send an action to the Redux store and trigger a state update.
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    dispatch(addTodo(trimmed))
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="add-todo">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What do you need to do?"
      />
      <button type="submit">Add</button>
    </form>
  )
}
