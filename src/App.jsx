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
import Register from "./pages/Register";
import Forbidden from "./pages/Forbidden";
import ProtectedRoute from "./components/protected-route";
import LeaderboardPage from "./pages/Leaderboard";
import UserStatsPage from "./pages/UserStatsPage";
import Datenschutz from "./pages/Datenschutz";
import AGB from "./pages/AGB";
import Kontakt from "./pages/Kontakt";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="regeln" element={<Rules />} />
        <Route path="blabli" element={<Impressum />} />
        <Route path="datenschutz" element={<Datenschutz />} />
        <Route path="agb" element={<AGB />} />
        <Route path="kontakt" element={<Kontakt />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
        <Route path="stats" element={<UserStatsPage />} />
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
