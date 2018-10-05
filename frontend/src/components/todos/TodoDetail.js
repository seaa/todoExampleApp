import React from 'react'
import "./TodoDetail.css"

// presentational component, only a stateless function
// gets props by destructuring the props object
const TodoDetail = ({ id, title, description }) => {
  return (
    <li className="Item" data-id={id}>
      <label>
        <div key={id}>
          <h3>{title}</h3>
          <span>{description}</span>
        </div>
      </label>
    </li>
    )
  }

export default TodoDetail
