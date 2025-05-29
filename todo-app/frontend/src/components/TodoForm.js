import { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
`;

const Input = styled.input`
    flex: 1;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Button = styled.button`
    padding: 12px 15px;
    background: #4A90E2;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
    &:hover {
        background: #357ABD;
    }
`;

const TodoForm = ({ onSubmit }) => {
    const [text, setText] = useState("");

    return (
        <Form onSubmit={(e) => { e.preventDefault(); onSubmit(text); }}>
            <Input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Add To-Do" />
            <Button type="submit">Add</Button>
        </Form>
    );
};

export default TodoForm;
