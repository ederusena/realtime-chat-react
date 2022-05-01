import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./pages/Register"
import Chat from "./pages/Chat"
import Login from "./pages/Login"

function app() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default app;