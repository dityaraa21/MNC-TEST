import { Route, Routes } from "react-router-dom";
import "./App.css";
import Age from "./pages/Age";
import Genres from "./pages/Genres";
import Home from "./pages/Home";
import Member from "./pages/Member";
import Transaction from "./pages/Transaction";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/member" element={<Member />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/age" element={<Age />} />
      </Routes>
    </div>
  );
}

export default App;
