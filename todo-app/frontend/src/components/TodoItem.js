import styled from "styled-components";

const TodoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #F8F8F8;
    padding: 12px 15px;
    margin-bottom: 10px;
    border-radius: 5px;
`;

// ⬇️ CHANGED: used $completed instead of completed
const TodoText = styled.h3`
    font-size: 18px;
    color: ${({ $completed }) => ($completed ? "#999" : "#333")};
    text-decoration: ${({ $completed }) => ($completed ? "line-through" : "none")};
`;

// ⬇️ CHANGED: used $color and $hoverColor instead of color and hoverColor
const Button = styled.button`
    padding: 8px 12px;
    margin-left: 10px;
    background: ${({ $color }) => $color || "#4A90E2"};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
    &:hover {
        background: ${({ $hoverColor }) => $hoverColor || "#357ABD"};
    }
`;

const TodoItem = ({ todo, onUpdate, onDelete }) => {
    return (
        <TodoContainer>
            {/* ⬇️ CHANGED: passed $completed */}
            <TodoText $completed={todo.completed}>{todo.text}</TodoText>
            <div>
                {/* ⬇️ CHANGED: passed $color and $hoverColor */}
                <Button $color="#28a745" $hoverColor="#218838" onClick={() => onUpdate(todo._id)}>Complete</Button>
                <Button $color="#dc3545" $hoverColor="#c82333" onClick={() => onDelete(todo._id)}>Delete</Button>
            </div>
        </TodoContainer>
    );
};

export default TodoItem;
