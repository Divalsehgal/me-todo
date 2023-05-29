import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "./authProvider";
import { LoginForm } from "./types";

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const { handleLogin } = useContext(AuthContext);

  const onSubmit = (data: LoginForm) => {
    const { username, password } = data;

    if (username === "user1" && password === "password1") {
      handleLogin(data);
    }
  };

  return (
    <div
      className={`flex justify-center items-center h-screen bg-gray-900 text-white' `}
    >
      <div className={`p-8 rounded shadow bg-gray-900 text-white' `}>
        <h2 className="text-2xl font-bold mb-4 text-white">Login Page</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("username")}
            defaultValue="user1"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
            placeholder="Username"
          />
          <input
            {...register("password")}
            defaultValue="password1"
            type="password"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
            placeholder="Password"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
