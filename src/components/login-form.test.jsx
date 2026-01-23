import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import LoginForm from "./login-form";

describe("LoginForm", () => {
  it("zeigt Validierungsfehler bei leeren Feldern", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.click(screen.getByRole("button", { name: /einloggen/i }));

    expect(
      screen.getByText(/Benutzername oder Email ist erforderlich/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Passwort ist erforderlich/i)).toBeInTheDocument();
  });

  it("zeigt Validierungsfehler bei zu kurzen Eingaben", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(
      screen.getByLabelText(/Benutzername oder Email/i),
      "ab"
    );
    await user.type(screen.getByLabelText(/Passwort/i), "123");
    await user.click(screen.getByRole("button", { name: /einloggen/i }));

    expect(
      screen.getByText(/Mindestens 3 Zeichen erforderlich/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Passwort muss mindestens 6 Zeichen haben/i)
    ).toBeInTheDocument();
  });

  it("ruft onLogin mit korrekten Daten auf", async () => {
    const user = userEvent.setup();
    const onLogin = vi.fn().mockResolvedValue(undefined);

    render(<LoginForm onLogin={onLogin} />);

    await user.type(
      screen.getByLabelText(/Benutzername oder Email/i),
      "user1"
    );
    await user.type(screen.getByLabelText(/Passwort/i), "passwort");
    await user.click(screen.getByRole("button", { name: /einloggen/i }));

    expect(onLogin).toHaveBeenCalledTimes(1);
    expect(onLogin).toHaveBeenCalledWith({
      usernameOrEmail: "user1",
      password: "passwort",
    });
  });
});
