import React, { createContext, useContext, useState } from 'react';
import DATA from './users.json';
import { SubTodo, Todo, TodoContextValue, User } from './types';


const TodoContext = createContext<TodoContextValue | undefined>(undefined);

export const useTodoContext = (): TodoContextValue => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoContextProvider');
  }
  return context;
};

interface TodoContextProviderProps {
  children: React.ReactNode;
}

const TodoContextProvider: React.FC<TodoContextProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<User[]>(DATA);

  const addTodo = (username: string, title: string): void => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      subTodos: [],
    };
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(user =>
        user.username === username ? { ...user, todos: [...(user.todos || []), newTodo] } : user
      );
      return updatedTodos;
    });
  };

  const addSubTodo = (username: string, parentId: number, title: string): void => {
    const newSubTodo: SubTodo = {
      id: Date.now(),
      title,
    };
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(user => {
        if (user.username === username) {
          const updatedTodos = (user.todos || []).map(todo =>
            todo.id === parentId ? { ...todo, subTodos: [...(todo.subTodos || []), newSubTodo] } : todo
          );
          return { ...user, todos: updatedTodos };
        }
        return user;
      });
      return updatedTodos;
    });
  };

  const value: TodoContextValue = {
    todos,
    addTodo,
    addSubTodo,
    setTodos,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoContextProvider;
