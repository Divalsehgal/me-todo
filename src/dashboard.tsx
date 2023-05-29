import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  memo,
  useCallback,
} from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "./authProvider";
import { useTodoContext } from "./todoProvider";
import { Todo, TodoForm, User } from "./types";

const Dashboard: React.FC = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm<TodoForm>();
  const { todos, addTodo, addSubTodo } = useTodoContext();
  const [currentTodo, setTodo] = useState<User | undefined>();
  const [showAddButton, setShowButton] = useState({
    show: false,
    id: 0,
  });
  const [showMainTodoButton, setMainTodoButton] = useState<boolean>(false);
  const cachedData = useMemo(() => todos, [todos]);

  useEffect(() => {
    const temp = cachedData?.find((t) => t.username === user?.username);
    setTodo(temp);
  }, [cachedData, user]);

  const openSubTodoHandler = useCallback((data: number) => {
    setShowButton({
      show: true,
      id: data,
    });   
    setMainTodoButton(false);
    
  }, []);

  const openMainTodoHandler = () => {
    setMainTodoButton(true);
    setShowButton({
      show: false,
      id: 0,
    });
  };

  const onSubmit = useCallback(
    (data: TodoForm) => {
      const { title } = data;
      if (!title) return;
      addTodo(user?.username || "", title);
      reset();
      setShowButton({
        show: false,
        id: 0,
      });
      setMainTodoButton(false);
    },
    [addTodo, reset, user?.username]
  );

  const handleAddSubTodo = useCallback(
    (parentId: number) => (data: TodoForm) => {
      const { subtitle } = data;
      if (!subtitle) return;
      addSubTodo(user?.username || "", parentId, subtitle);
      reset();
      setShowButton({
        show: false,
        id: 0,
      });
    },
    [addSubTodo, reset, user?.username]
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">
          Your Profile Information:
        </h3>
        <p className="mb-4">Username: {user?.username}</p>

        <h3 className="text-lg font-semibold mb-2">Your Todos:</h3>
        {currentTodo?.todos?.length ? (
          <ul className="list-disc ml-6 mb-4">
            {currentTodo?.todos.map((todo: Todo) => (
              <li key={todo.id} className="mb-2">
                {todo.title}
                {todo?.subTodos && todo?.subTodos?.length >= 0 ? (
                  <>
                    {" "}
                    <ul className="list-disc ml-6 mb-2">
                      {todo?.subTodos.map((subTodo) => (
                        <li key={subTodo.id} className="ml-4">
                          {subTodo.title}
                        </li>
                      ))}
                      {showAddButton.show && todo.id === showAddButton.id && (
                        <li className="ml-4">
                          <form
                            onSubmit={handleSubmit(handleAddSubTodo(todo.id))}
                          >
                            <input
                              className="w-40 p-1 border border-gray-300 rounded"
                              {...register("subtitle")}
                              placeholder="Sub Todo Title"
                            />
                            <button
                              type="submit"
                              className="ml-2 px-3 py-1 bg-blue-500 text-white rounded"
                            >
                              Add Sub Todo
                            </button>
                          </form>
                        </li>
                      )}
                    </ul>
                    {!showAddButton.show && (
                      <button
                        className="text-sm ml-2 text-gray-500 hover:text-gray-800 focus:outline-none"
                        onClick={() => openSubTodoHandler(todo.id)}
                      >
                        Add Todo
                      </button>
                    )}
                  </>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mb-4">No todos</p>
        )}

        <h3 className="text-lg font-semibold mb-2">Add New Todo:</h3>
        {!showMainTodoButton ? (
          <button
            className="text-sm ml-2 text-gray-500 hover:text-gray-800 focus:outline-none mb-2"
            onClick={openMainTodoHandler}
          >
            Add Sub todo
          </button>
        ) : null}
        {showMainTodoButton ? (
          <form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
            <input
              className="w-40 p-1 border border-gray-300 rounded mr-2"
              {...register("title")}
              placeholder="Title"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Add Main Todo
            </button>
          </form>
        ) : null}

        <br />
        <button
          className="px-3 py-1 bg-red-500 text-white rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default memo(Dashboard);
