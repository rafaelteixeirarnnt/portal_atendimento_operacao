import { render, screen, within } from "@testing-library/react";
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

    const stateDialog = screen.getByRole("dialog", { name: "Escolha o estado de atendimento" });
    expect(stateDialog).toBeInTheDocument();
    expect(within(stateDialog).getByText("Use esta escolha para ver apenas os sistemas da sua operação.")).toBeInTheDocument();
    expect(within(stateDialog).getByText("Depois, se precisar, você pode trocar no topo da página.")).toBeInTheDocument();
    expect(within(stateDialog).queryByText(/Vamos mostrar apenas os sistemas disponíveis/)).not.toBeInTheDocument();
    expect(within(stateDialog).queryByText("SMS-SP e Einstein SES-SP")).not.toBeInTheDocument();
    expect(within(stateDialog).queryByText("SES-MA")).not.toBeInTheDocument();
    expect(within(stateDialog).queryByText("Einstein SES-MT")).not.toBeInTheDocument();
    expect(within(stateDialog).getAllByRole("button").map((button) => button.textContent)).toEqual([
      "Maranhão",
      "Mato Grosso",
      "São Paulo"
    ]);
    await userEvent.click(screen.getByRole("button", { name: /São Paulo/ }));

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

    expect(screen.queryByRole("dialog", { name: "Escolha o estado de atendimento" })).not.toBeInTheDocument();
    expect(screen.getByText("SES-MA")).toBeInTheDocument();
    expect(screen.queryByText("SMS-SP")).not.toBeInTheDocument();
  });

  it("restores the saved client for the selected state", async () => {
    localStorage.setItem(
      "liberty.portal-atendimento.preferences.v1",
      JSON.stringify({
        theme: "system",
        selectedState: "MA",
        lastContractId: "sms-sp",
        lastContractByState: { MA: "einstein-ses-ma", SP: "sms-sp" },
        recentServices: []
      })
    );
    window.history.pushState({}, "", "/");

    render(<App />);

    expect(await screen.findByRole("heading", { name: "SES-MA" })).toBeInTheDocument();
    expect(window.location.hash).toBe("#/contracts/einstein-ses-ma");
  });

  it("keeps the client selection visible when requested from the home link", () => {
    localStorage.setItem(
      "liberty.portal-atendimento.preferences.v1",
      JSON.stringify({
        theme: "system",
        selectedState: "MA",
        lastContractByState: { MA: "einstein-ses-ma" },
        recentServices: []
      })
    );
    window.history.pushState({}, "", "/#/?selecionarCliente=1");

    render(<App />);

    expect(screen.getByText("SES-MA")).toBeInTheDocument();
    expect(window.location.pathname).toBe("/");
    expect(window.location.hash).toBe("#/?selecionarCliente=1");
  });

  it("does not render the home search bar", () => {
    localStorage.setItem(
      "liberty.portal-atendimento.preferences.v1",
      JSON.stringify({ theme: "system", selectedState: "SP", recentServices: [] })
    );
    window.history.pushState({}, "", "/");

    render(<App />);

    expect(screen.queryByRole("searchbox", { name: "Pesquisar" })).not.toBeInTheDocument();
    expect(screen.getByText("SMS-SP")).toBeInTheDocument();
  });
});
