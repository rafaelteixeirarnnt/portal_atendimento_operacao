import { render, screen } from "@testing-library/react";
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
    const navigateSpy = vi.spyOn(navigation, "navigateInCurrentTab").mockImplementation(() => undefined);

    render(<App />);
    await userEvent.click(screen.getByRole("button", { name: /Atendimento Geral/ }));
    await userEvent.click(screen.getByRole("button", { name: "Abrir chamado: Incidente" }));

    expect(screen.getByRole("dialog")).toHaveTextContent("Antes de continuar confirme");
    expect(screen.queryByRole("button", { name: "Continuar para o Jira" })).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Continuar" }));
    expect(navigateSpy).toHaveBeenCalledWith("https://libertyti.atlassian.net/servicedesk/customer/portal/219/create/1496");

    navigateSpy.mockRestore();
  });

  it("shows an empty state for missing contracts", () => {
    window.history.pushState({}, "", "/#/contracts/inexistente");

    render(<App />);

    expect(screen.getByText("Contrato inexistente")).toBeInTheDocument();
  });

  it("returns to the portal when the state changes", async () => {
    window.history.pushState({}, "", "/#/contracts/sms-sp");

    render(<App />);

    await userEvent.click(screen.getByRole("button", { name: "São Paulo" }));
    await userEvent.click(screen.getByRole("button", { name: "Maranhão" }));

    expect(window.location.pathname).toBe("/");
    expect(screen.getByText("SES-MA")).toBeInTheDocument();
    expect(screen.queryByText("SMS-SP")).not.toBeInTheDocument();
  });
});
