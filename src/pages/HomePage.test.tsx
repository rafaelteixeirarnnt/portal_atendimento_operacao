import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { App } from "@/App";

describe("HomePage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("asks for state on first access and filters contracts after selection", async () => {
    window.history.pushState({}, "", "/");

    render(<App />);

    expect(screen.getByRole("dialog", { name: "Selecione seu estado" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /São Paulo/ }));

    expect(screen.getByRole("heading", { name: "Portal de Atendimento" })).toBeInTheDocument();
    expect(screen.getByText("SMS-SP")).toBeInTheDocument();
    expect(screen.getByText("Einstein SES-SP")).toBeInTheDocument();
    expect(screen.queryByText("SES-MA")).not.toBeInTheDocument();
  });

  it("uses the saved state on future access", () => {
    localStorage.setItem(
      "liberty.portal-atendimento.preferences.v1",
      JSON.stringify({ theme: "system", selectedState: "MA", recentServices: [] })
    );
    window.history.pushState({}, "", "/");

    render(<App />);

    expect(screen.queryByRole("dialog", { name: "Selecione seu estado" })).not.toBeInTheDocument();
    expect(screen.getByText("SES-MA")).toBeInTheDocument();
    expect(screen.queryByText("SMS-SP")).not.toBeInTheDocument();
  });

  it("shows service matches while typing", async () => {
    localStorage.setItem(
      "liberty.portal-atendimento.preferences.v1",
      JSON.stringify({ theme: "system", selectedState: "SP", recentServices: [] })
    );
    window.history.pushState({}, "", "/");

    render(<App />);
    await userEvent.type(screen.getByRole("searchbox", { name: "Pesquisar" }), "senha");

    expect(await screen.findByText("Reset de senha para BI")).toBeInTheDocument();
    expect(screen.getByText("Cadastro de usuários")).toBeInTheDocument();
  });
});
