import React from "react";

const TodoList = ({ todos, handleDelete, handleEdit }) => {
    return (
        <>
            {todos.map((t) => (
                <ul key={t.id} className="allTodos">
                    <li className="singleTodo">
                        <span className="todoText">
                            {t.todo}
                        </span>
                        <button onClick={() => handleEdit(t.id)}>Edit</button>
                        <button onClick={() => handleDelete(t.id)}>Delete</button>
                    </li>
                </ul>
            ))}
        </>
    );
};

export default TodoList;
