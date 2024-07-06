import { useState,useEffect } from "react";
import Navbar from "./components/Navbar";
import {v4 as uuid4} from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {

    let todoString=localStorage.getItem("todos")
    if (todoString) {
      
      let todos= JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
    
  }, [])
  

  const saveToLS = () => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }


  const handleAdd=()=>{
    setTodos([...todos, {id: uuid4(),todo, isCompleted:false}])
    setTodo("")
    saveToLS()
  }


  const handleDelete=(e,id)=>{
    let newTodos=todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)
    saveToLS()
  }


  


  const handleEdit=(e,id)=>{
    let t= todos.filter(i=>i.id===id)
    setTodo(t[0].todo)

    let newTodos=todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)
    saveToLS()
  }


  const handleChange=(e)=>{
    setTodo(e.target.value)
  }


  const handleCheckbox =(e) => {
    let id= e.target.name
    let index = todos.findIndex(item=>{
      return item.id===id
    })
    let newTodos=[...todos]
    newTodos[index].isCompleted=!newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()

  }

  const toggleFinished=()=>{
    setShowFinished(!showFinished)
  }
  

  return (
    <>
      <Navbar />
      <div className="container w-[90vw] bg-violet-300 min-h-[85vh] rounded-xl p-5 m-5 mx-auto space-y-2">
        <div className="addtodo  space-y-2">
          <h2 className="font-bold text-xl">Add a todo</h2>
          <input type="text" onChange={handleChange} value={todo} className="w-1/2 rounded-lg p-1"/>
          <button onClick={handleAdd} disabled={todo.length<=3} className="bg-violet-700 hover:bg-violet-800 text-white mx-3 rounded-xl px-3 py-2 text-sm">Save</button>
        </div>

        <input type="checkbox" onChange={toggleFinished} checked={showFinished} name="" id="" />Show Finished todos
        <h2 className="font-bold text-xl">Your Todos</h2>
        <div className="todos">
          {todos.length===0 && <div className="m-3">No todos to display</div>}
        {todos.map(item=>{

          return(showFinished || !item.isCompleted) && <div key={item.id} className="todo w-1/2 justify-between flex space-y-2">
            <div className="flex gap-3 items-center ">
            <input onChange={handleCheckbox} type="checkbox" name={item.id} checked={item.isCompleted} id="" />
            <div className={item.isCompleted?"line-through ":""}>
              {item.todo}
            </div>
            </div>
            <div className="btns flex ">
              <button onClick={(e)=>{handleEdit(e,item.id)}} className="bg-violet-700 text-white hover:bg-violet-800 mx-1 rounded-xl px-2 py-1 text-sm"><FaEdit /></button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className="bg-violet-700 text-white hover:bg-violet-800 mx-1 rounded-xl px-2 py-1 text-sm"><MdDeleteForever /></button>
            </div>
          </div>
        })}
        </div>
      </div>
    </>
  );
}

export default App;
