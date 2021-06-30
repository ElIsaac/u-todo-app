
import React, { useEffect, useReducer } from 'react'
import { TodoList } from './components/TodoList'
import { useForm } from './hooks/useForm'
import { todoReducer } from './reducer/todoReducer'



const initialState = [
  {
    id: new Date().getTime(),
    desc: "apr",
    done: false,
  }
]

const init=()=>{
 if(localStorage.getItem('todos')){
   return  JSON.parse(localStorage.getItem('todos'))
 }else{
  return []
 }
}

const TodoApp = () => {

  const [todos, dispatch] = useReducer(todoReducer, [], init)



  const [{ description }, handleInputChange, reset] = useForm({
    description: ""
  })



  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])


  




 

  const handleSubmit = e => {
    if(description.trim().length < 1){
      return;
    }
    e.preventDefault();
    console.log(e)
    const newTodo =
    {
      id: new Date().getTime(),
      desc: description,
      done: false,
    }
    const action = {
      type: "add",
      payload: newTodo
    }
    dispatch(action)
    reset()
  }


const handleDelete=(todoId)=>{
  console.log(todoId)
  const action={
    type: "delete",
    payload: todoId
  }
  dispatch(action)
}

const handleToggle=(todoId)=>{
  dispatch({
    type: 'toggle',
    payload: todoId
  })
}


  return (
    <div className="container" >
      <h1>Todo App {todos.length}</h1>
      <hr />

      <div className="row">
        <TodoList todos={todos} handleToggle={handleToggle} handleDelete={handleDelete} />
        

        <div className="col-5" >
          <h4>Agregar ToDo</h4>
          <hr />
          <form onSubmit={handleSubmit} >
            <input
              type="text"
              name="description"
              className="form-control"
              placeholder="Aprender"
              autoComplete="off"
              value={description}
              onChange={handleInputChange}

            />

            <div class="d-grid gap-2">
              <button className="btn btn-primary mt-3 " type="submit">
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default TodoApp
