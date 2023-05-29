import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./authProvider";
import PrivateRoute from "./privateRoute";
import Login from "./Login";
import Dashboard from "./dashboard";
import TodoContextProvider from "./todoProvider";
import NotFound from "./notFound";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={"Loading..."}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <TodoContextProvider>
                      <Dashboard />
                    </TodoContextProvider>
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
