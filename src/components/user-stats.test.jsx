import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import UserStats from "./user-stats";
import * as leaderboardService from "../services/leaderboard-service";

vi.mock("../services/leaderboard-service");

const renderWithAuth = (user = null) => {
  const authValue = {
    user,
    isAuthenticated: !!user,
    token: user ? "mock-token" : null,
  };

  return render(
    <MemoryRouter>
      <AuthContext.Provider value={authValue}>
        <UserStats />
      </AuthContext.Provider>
    </MemoryRouter>
  );
};

describe("UserStats Component", () => {
  it("sollte Login-Aufforderung zeigen wenn nicht eingeloggt", () => {
    renderWithAuth(null);

    expect(screen.getByText(/Login erforderlich/i)).toBeInTheDocument();
    expect(screen.getByText(/Zum Login/i)).toBeInTheDocument();
  });

  it("sollte User-Statistiken anzeigen wenn eingeloggt", async () => {
    const mockUser = { id: 1, username: "player1", role: "PLAYER" };
    const mockStats = {
      userId: 1,
      username: "player1",
      gamesPlayed: 15,
      totalScore: 1200,
      averageScore: 80.0,
    };

    leaderboardService.getUserStats.mockResolvedValue(mockStats);

    renderWithAuth(mockUser);

    await waitFor(() => {
      expect(screen.getByText("player1")).toBeInTheDocument();
    });

    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText("1200")).toBeInTheDocument();
    expect(screen.getByText("80.0")).toBeInTheDocument();
  });

  it("sollte 0 anzeigen wenn keine Spiele gespielt", async () => {
    const mockUser = { id: 2, username: "newplayer", role: "PLAYER" };
    const mockStats = {
      userId: 2,
      username: "newplayer",
      gamesPlayed: 0,
      totalScore: 0,
      averageScore: 0.0,
    };

    leaderboardService.getUserStats.mockResolvedValue(mockStats);

    renderWithAuth(mockUser);

    await waitFor(() => {
      expect(screen.getByText("newplayer")).toBeInTheDocument();
    });

    expect(screen.getAllByText("0")).toHaveLength(2);
    expect(screen.getByText("0.0")).toBeInTheDocument();
    expect(screen.getByText(/Noch keine Spiele/i)).toBeInTheDocument();
  });
});
