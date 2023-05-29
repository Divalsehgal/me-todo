export interface SubTodo {
    id: number;
    title: string;
  }
  
  export interface Todo {
    id: number;
    title: string;
    subTodos?: SubTodo[]
  }
  
  export interface User {
    username: string;
    password: string;
    name: string;
    email: string;
    todos?: Todo[];
  }
  
  export interface TodoForm {
    title: string;
    subtitle: string;
  }

  export interface TodoContextValue {
    todos: User[];
    addTodo: (username: string, title: string) => void;
    addSubTodo: (username: string, parentId: number, title: string) => void;
    setTodos: (todos: User[]) => void;
  }
  
  export interface LoginForm {
    username: string;
    password: string;
  }
  
  export interface AuthContextType {
    user: LoginForm | null;
    handleLogin: (formData: LoginForm) => void;
    handleLogout: () => void;
  }
  
 