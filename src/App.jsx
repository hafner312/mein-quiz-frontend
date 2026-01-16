import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Game from "./pages/Game";
import QuestionManager from "./pages/QuestionManager";
import Impressum from "./pages/Impressum";
import Rules from "./pages/Rules";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./components/layout";
import Login from "./pages/Login";
import Forbidden from "./pages/Forbidden";
import ProtectedRoute from "./components/protected-route";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="regeln" element={<Rules />} />
        <Route path="blabli" element={<Impressum />} />
        <Route path="forbidden" element={<Forbidden />} />

        <Route
          path="quiz"
          element={
            <ProtectedRoute>
              <Game />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <QuestionManager />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
