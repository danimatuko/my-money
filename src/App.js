import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./context/authContext";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { authIsReady } = useAuthContext();

  return (
    <div id="app">
      {authIsReady && (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
