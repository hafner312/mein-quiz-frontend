import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import SubjectStats from "./subject-stats";
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
        <SubjectStats />
      </AuthContext.Provider>
    </MemoryRouter>
  );
};

describe("SubjectStats Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sollte Fächerstatistiken anzeigen", async () => {
    const mockUser = { id: 1, username: "player1", role: "USER" };
    const mockStats = [
      { subject: "mathematik", notesCount: 4 },
      { subject: "biologie", notesCount: 2 },
    ];

    statsService.getSubjectStats.mockResolvedValue(mockStats);

    renderWithAuth(mockUser);

    await waitFor(() => {
      expect(screen.getByText("mathematik")).toBeInTheDocument();
    });

    expect(screen.getByText("biologie")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("sollte Loading-State anzeigen", () => {
    const mockUser = { id: 1, username: "player1", role: "USER" };
    statsService.getSubjectStats.mockImplementation(
      () => new Promise(() => {})
    );

    renderWithAuth(mockUser);

    expect(
      screen.getByText(/Statistiken werden geladen/i)
    ).toBeInTheDocument();
  });

  it("sollte Fehlermeldung bei API-Fehler anzeigen", async () => {
    const mockUser = { id: 1, username: "player1", role: "USER" };
    statsService.getSubjectStats.mockRejectedValue(new Error("API Error"));

    renderWithAuth(mockUser);

    await waitFor(() => {
      expect(screen.getByText(/Fehler beim Laden/i)).toBeInTheDocument();
    });
  });
});
