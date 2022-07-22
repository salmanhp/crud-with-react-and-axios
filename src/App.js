import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      axios.put(`https://62d7dbc19c8b5185c77d936f.mockapi.io/crud/${editId}`, {
        todo
      })
        .then((utodos) => {
          setTodos([utodos.data]);
        })

      setEditId(0);
      setTodo("");
      return;

    }

    if (todo !== "") {
      axios.post(`https://62d7dbc19c8b5185c77d936f.mockapi.io/crud`, {
        todo
      })
        .then((ctodos) => {
          setTodos([...todos, ctodos.data])
        })

      setTodo("");
    }

  };

  const handleDelete = (id) => {
    axios.delete(`https://62d7dbc19c8b5185c77d936f.mockapi.io/crud/${id}`)
    setTodos(
      todos.filter((dpost) => {
        return dpost.id !== id;
      })
    );

  };

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);

  };

  useEffect(() => {
    axios.get(`https://62d7dbc19c8b5185c77d936f.mockapi.io/crud`)
      .then((res) => {
        setTodos(res.data);
      })
  }, [todos]);



  return (
    <div className="App">
      <div className="container">
        <h1>Todo List App</h1>
        <TodoForm
          handleSubmit={handleSubmit}
          todo={todo}
          editId={editId}
          setTodo={setTodo}
        />

        <TodoList
          todos={todos}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default App;
