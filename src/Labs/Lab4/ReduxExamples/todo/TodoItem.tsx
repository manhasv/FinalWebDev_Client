import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: { todo: any }) { // Specify the type of the todo parameter
    const dispatch = useDispatch();
    return (
        <li key={todo.id} className="list-group-item d-flex align-items-center justify-content-between">
            <span>{todo.title}</span>
            <div>
            <button onClick={() => dispatch(deleteTodo(todo.id))}
                    className="btn btn-danger me-2"
                            id="wd-delete-todo-click"> Delete </button>
            <button onClick={() => dispatch(setTodo(todo))}
                    className="btn btn-primary  me-2"
                            id="wd-set-todo-click"> Edit </button>
            </div>
        </li>
);}
