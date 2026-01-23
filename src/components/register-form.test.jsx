import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import RegisterForm from "./register-form";

describe("RegisterForm", () => {
  it("zeigt Pflichtfeld-Fehler bei leerem Formular", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    await user.click(screen.getByRole("button", { name: /registrieren/i }));

    expect(
      screen.getByText(/Benutzername ist erforderlich/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Email ist erforderlich/i)).toBeInTheDocument();
    expect(screen.getByText(/Passwort ist erforderlich/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Bitte Passwort bestaetigen/i)
    ).toBeInTheDocument();
  });

  it("zeigt Fehler bei ungueltiger Email und Passwort-Mismatch", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    await user.type(screen.getByLabelText(/Benutzername/i), "user1");
    await user.type(screen.getByLabelText(/Email/i), "ungueltig");
    await user.type(screen.getByLabelText(/^Passwort \*/i), "passwort");
    await user.type(
      screen.getByLabelText(/Passwort bestaetigen/i),
      "anderes"
    );
    await user.click(screen.getByRole("button", { name: /registrieren/i }));

    expect(screen.getByText(/Email muss gueltig sein/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Passwoerter stimmen nicht ueberein/i)
    ).toBeInTheDocument();
  });

  it("ruft onRegister mit korrekten Daten auf", async () => {
    const user = userEvent.setup();
    const onRegister = vi.fn().mockResolvedValue(undefined);

    render(<RegisterForm onRegister={onRegister} />);

    await user.type(screen.getByLabelText(/Benutzername/i), "user1");
    await user.type(screen.getByLabelText(/Email/i), "user1@notizen.ch");
    await user.type(screen.getByLabelText(/^Passwort \*/i), "passwort");
    await user.type(
      screen.getByLabelText(/Passwort bestaetigen/i),
      "passwort"
    );
    await user.click(screen.getByRole("button", { name: /registrieren/i }));

    expect(onRegister).toHaveBeenCalledTimes(1);
    expect(onRegister).toHaveBeenCalledWith({
      username: "user1",
      email: "user1@notizen.ch",
      password: "passwort",
    });
  });
});
