import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./Components/Create";
import Read from "./Components/Read";
import Update from "./Components/Update";
import Login from "./Components/Login";
import Registration from "./Components/Registration";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Read />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/product/create" element={<Create />}></Route>
          <Route path="/register" element={<Registration />}></Route>
          <Route path="/read" element={<Read />}></Route>
          <Route path="/update" element={<Update />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;