import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { Home } from "./pages/Home";
import { Chat } from "./pages/Chat";
import { GenerateRoom } from "./pages/GenerateRoom";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/generateRoom" element={<GenerateRoom />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  )
};

export default App;
