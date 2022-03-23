import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Error from "./components/Error";
import Default from "./components/Default";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const [user, setUser] = useState({});

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={<Login user={user} setUser={setUser} />}
        />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/welcome" element={<Default user={user} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
