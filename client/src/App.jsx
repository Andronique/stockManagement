import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./components/login/Login";
import DetenteurPage from "./pages/DetenteurPage";
import './App.css'

function App() {

  return (
    <>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/detenteur" element={<DetenteurPage />} />
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
