import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { App } from "@/App";
import * as navigation from "@/utils/navigation";

describe("ContractPage", () => {
  beforeEach(() => {
    localStorage.setItem(
      "liberty.portal-atendimento.preferences.v1",
      JSON.stringify({ theme: "system", selectedState: "SP", recentServices: [] })
    );
  });

  it("renders contract categories and services", async () => {
    window.history.pushState({}, "", "/#/contracts/sms-sp");

    render(<App />);

    expect(screen.getByRole("img", { name: "Prefeitura de São Paulo" })).toHaveAttribute("src", "/contracts/sms-sp-horizontal.png");
    expect(screen.getByRole("heading", { name: "SMS-SP" })).toBeInTheDocument();
    const searchBar = screen.getByPlaceholderText("Filtrar serviços deste contrato");
    const openRequestsShortcut = screen.getByRole("link", { name: "Ver meus chamados abertos" });
    expect(searchBar.compareDocumentPosition(openRequestsShortcut) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getAllByText("Business Intelligence").length).toBeGreaterThan(0);
    await userEvent.click(screen.getByRole("button", { name: /Business Intelligence/ }));
    expect(screen.getByText("Solicitar acesso ao BI")).toBeInTheDocument();
    expect(screen.queryByText("Abrir chamado")).not.toBeInTheDocument();
  });

  it("uses the color Einstein logo on the contract detail header", () => {
    window.history.pushState({}, "", "/#/contracts/einstein-ses-sp");

    render(<App />);

    expect(screen.getByRole("img", { name: "Einstein Hospital Israelita" })).toHaveAttribute(
      "src",
      "/contracts/einstein-horizontal-color.png"
    );
  });

  it("opens guidance before redirecting incident services", async () => {
    window.history.pushState({}, "", "/#/contracts/sms-sp");
    const openInNewTabSpy = vi.spyOn(navigation, "openInNewTab").mockImplementation(() => undefined);

    render(<App />);
    await userEvent.click(screen.getByRole("button", { name: /Atendimento Geral/ }));
    await userEvent.click(screen.getByRole("button", { name: "Abrir chamado: Incidente" }));

    expect(screen.getByRole("dialog")).toHaveTextContent("Antes de continuar confirme");
    expect(screen.queryByRole("button", { name: "Continuar para o Jira" })).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Continuar" }));
    expect(openInNewTabSpy).toHaveBeenCalledWith("https://libertyti.atlassian.net/servicedesk/customer/portal/219/create/1496");

    openInNewTabSpy.mockRestore();
  });

  it("shows an empty state for missing contracts", () => {
    window.history.pushState({}, "", "/#/contracts/inexistente");

    render(<App />);

    expect(screen.getByText("Contrato inexistente")).toBeInTheDocument();
  });

  it("returns to the portal when the state changes", async () => {
    window.history.pushState({}, "", "/contracts/einstein-ses-sp?origem=atalho#/contracts/sms-sp?selecionarCliente=1");

    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: "São Paulo" }));
    await userEvent.click(screen.getByRole("button", { name: "Maranhão" }));

    expect(window.location.pathname).toBe("/");
    expect(window.location.search).toBe("");
    expect(window.location.hash).toBe("#/");
    expect(screen.getByText("SES-MA")).toBeInTheDocument();
    expect(screen.queryByText("SMS-SP")).not.toBeInTheDocument();
  });

  it("returns to the portal when the Liberty logo is clicked", async () => {
    window.history.pushState({}, "", "/contracts/einstein-ses-sp?origem=atalho#/contracts/sms-sp");

    render(<App />);

    await userEvent.click(screen.getByRole("link", { name: "Liberty health - Portal de Atendimento" }));

    await waitFor(() => expect(window.location.hash).toBe("#/?selecionarCliente=1"));
    expect(window.location.pathname).toBe("/");
    expect(window.location.search).toBe("");
    expect(screen.getByText("SMS-SP")).toBeInTheDocument();
    expect(screen.getByText("Einstein SES-SP")).toBeInTheDocument();
  });
});
