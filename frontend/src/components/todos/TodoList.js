import React from 'react'
import TodoDetail from './TodoDetail'

// presentational component, only a stateless function
// gets props by destructuring the props object
const TodoList = ({data}) => {
  const todos = data.map(todo => {
    return <TodoDetail
      key={todo.id}
      title={todo.title}
      description={todo.description}
    />
  })
  return <ul className="ItemList">{todos}</ul>
}

export default TodoList
