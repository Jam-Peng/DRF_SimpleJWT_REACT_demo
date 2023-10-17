import './styles/css/index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from './pages/Login';
import AuthProvider from './context/AuthContext';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Dashboard />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Route>

            <Route path="*" element={<NotFound />}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
