import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import UserStats from "./user-stats";
import * as statsService from "../services/stats-service";

vi.mock("../services/stats-service");

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
  it("sollte Hinweis zeigen wenn nicht eingeloggt", () => {
    renderWithAuth(null);

    expect(
      screen.getByText(/Aktuell sind keine Statistiken verfügbar/i)
    ).toBeInTheDocument();
  });

  it("sollte User-Statistiken anzeigen wenn eingeloggt", async () => {
    const mockUser = { id: 1, username: "player1", role: "USER" };
    const mockStats = {
      userId: 1,
      username: "player1",
      totalNotes: 15,
      subjectsUsed: 4,
      lastUpdatedAt: "2026-01-23T10:30:00",
    };

    statsService.getUserStats.mockResolvedValue(mockStats);

    renderWithAuth(mockUser);

    await waitFor(() => {
      expect(screen.getByText("player1")).toBeInTheDocument();
    });

    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("sollte 0 anzeigen wenn keine Notizen vorhanden sind", async () => {
    const mockUser = { id: 2, username: "newplayer", role: "USER" };
    const mockStats = {
      userId: 2,
      username: "newplayer",
      totalNotes: 0,
      subjectsUsed: 0,
      lastUpdatedAt: null,
    };

    statsService.getUserStats.mockResolvedValue(mockStats);

    renderWithAuth(mockUser);

    await waitFor(() => {
      expect(screen.getByText("newplayer")).toBeInTheDocument();
    });

    expect(screen.getAllByText("0")).toHaveLength(2);
    expect(screen.getByText(/Noch keine Notizen/i)).toBeInTheDocument();
  });
});
