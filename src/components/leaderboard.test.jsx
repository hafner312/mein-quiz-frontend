import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Leaderboard from "./leaderboard";
import * as leaderboardService from "../services/leaderboard-service";

vi.mock("../services/leaderboard-service");

describe("Leaderboard Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sollte Top 10 Spieler anzeigen", async () => {
    const mockPlayers = [
      { userId: 1, username: "player1", gamesPlayed: 10, totalScore: 500 },
      { userId: 2, username: "player2", gamesPlayed: 8, totalScore: 400 },
      { userId: 3, username: "player3", gamesPlayed: 5, totalScore: 300 },
    ];

    leaderboardService.getTop10Players.mockResolvedValue(mockPlayers);

    render(<Leaderboard />);

    await waitFor(() => {
      expect(screen.getByText("player1")).toBeInTheDocument();
    });

    expect(screen.getByText("player2")).toBeInTheDocument();
    expect(screen.getByText("player3")).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByText("400")).toBeInTheDocument();
  });

  it("sollte Loading-State anzeigen", () => {
    leaderboardService.getTop10Players.mockImplementation(
      () => new Promise(() => {})
    );

    render(<Leaderboard />);

    expect(
      screen.getByText(/Leaderboard wird geladen/i)
    ).toBeInTheDocument();
  });

  it("sollte Fehlermeldung bei API-Fehler anzeigen", async () => {
    leaderboardService.getTop10Players.mockRejectedValue(
      new Error("API Error")
    );

    render(<Leaderboard />);

    await waitFor(() => {
      expect(screen.getByText(/Fehler beim Laden/i)).toBeInTheDocument();
    });
  });
});
