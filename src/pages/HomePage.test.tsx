import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "@/App";

describe("HomePage", () => {
  it("renders contract cards from configuration", () => {
    window.history.pushState({}, "", "/");

    render(<App />);

    expect(screen.getByRole("heading", { name: "Portal de Atendimento" })).toBeInTheDocument();
    expect(screen.getByText("SMS-SP")).toBeInTheDocument();
    expect(screen.getByText("Einstein SES-MA")).toBeInTheDocument();
  });

  it("shows service matches while typing", async () => {
    window.history.pushState({}, "", "/");

    render(<App />);
    await userEvent.type(screen.getByRole("searchbox", { name: "Pesquisar" }), "senha");

    expect(await screen.findByText("Reset de senha para BI")).toBeInTheDocument();
    expect(screen.getByText("Cadastro de usuários")).toBeInTheDocument();
  });
});
