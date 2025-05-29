import { useEffect, useState } from "react";
import axios from "axios";
import TodoItem from "../components/TodoItem";
import TodoForm from "../components/TodoForm";
import styled from "styled-components";

// const Container = styled.div`
//     max-width: 600px;
//     margin: auto;
//     padding: 20px;
//     background: #fff;
//     border-radius: 10px;
//     box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
//     text-align: center;
//     overflow-y:auto;
// `;

const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-height: 70vh; /* ✅ Ensures the page layout remains consistent */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ScrollContainer = styled.div`
  flex-grow: 1; /* ✅ Yeh ensure karega ki ye pura space use kare bina footer ko push kiye */
  max-height: 60vh; /* ✅ Yeh height set karega taaki footer affect na ho */
  overflow-y: auto; /* ✅ Scroll sirf task list me ho, pure page me nahi */
  padding: 10px;
  border: 1px solid #ccc;
  background: #f8f8f8;
  border-radius: 5px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const loggedInUserEmail = localStorage.getItem("userEmail"); // ✅ Get email from local storage

    if (!loggedInUserEmail) {
      console.error("No user email found in localStorage");
      return;
    }

    axios
      .get(`http://localhost:5000/todos/${loggedInUserEmail}`)
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const addTodo = (text) => {
    const email = localStorage.getItem("userEmail"); // ✅ Get stored user email

    if (!email) {
      console.error("No user email found in localStorage");
      return;
    }

    axios
      .post("http://localhost:5000/todos", { text, email })
      .then(() => window.location.reload())
      .catch((err) => console.error("Error adding task:", err));
  };

  const completeTodo = (id) => {
    axios
      .put(`http://localhost:5000/todos/${id}`, { completed: true })
      .then(() => window.location.reload());
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/todos/${id}`)
      .then(() => window.location.reload());
  };

  return (
    <Container>
      <Title>My To-Do List</Title>
      <TodoForm onSubmit={addTodo} />
      <ScrollContainer>
        {todos.length === 0 ? (
          <p style={{ color: "#888" }}>No tasks added yet!</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onUpdate={completeTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </ScrollContainer>
    </Container>
  );
};

export default TodoList;
