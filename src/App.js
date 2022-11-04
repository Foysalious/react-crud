import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./Components/Create";
import Read from "./Components/Read";
import Update from "./Components/Update";
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import ProductDetails from "./Components/ProductDetails";
import Header from "./Components/Header";

function App() {
  return (
    <div className="container">
      <BrowserRouter>     
          <Header> </Header>
          <Routes>
          <Route exact path="/" element={<Read />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/product/create" element={<Create />}></Route>
          <Route path="/register" element={<Registration />}></Route>
          <Route path="/read" element={<Read />}></Route>
          <Route path="/product/update/:slug" element={<Update />}></Route>
          <Route path="/product/:slug" element={<ProductDetails />}></Route>
          </Routes>
         
      </BrowserRouter>
    </div>
  );
}

export default App;