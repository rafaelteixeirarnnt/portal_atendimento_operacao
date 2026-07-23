import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { App } from "@/App";

describe("ContractPage", () => {
  it("renders contract categories and services", () => {
    window.history.pushState({}, "", "/contracts/sms-sp");

    render(<App />);

    expect(screen.getByRole("heading", { name: "SMS-SP" })).toBeInTheDocument();
    expect(screen.getAllByText("Business Intelligence").length).toBeGreaterThan(0);
    expect(screen.getByText("Solicitar acesso ao BI")).toBeInTheDocument();
  });

  it("opens guidance before redirecting incident services", async () => {
    window.history.pushState({}, "", "/contracts/sms-sp");
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);

    render(<App />);
    await userEvent.click(screen.getByRole("button", { name: "Abrir chamado: Incidente" }));

    expect(screen.getByRole("dialog")).toHaveTextContent("Antes de continuar confirme");

    await userEvent.click(screen.getByRole("button", { name: "Continuar para o Jira" }));
    expect(openSpy).toHaveBeenCalledWith(
      "https://libertyti.atlassian.net/servicedesk/customer/portal/219/create/1496",
      "_blank",
      "noopener,noreferrer"
    );

    openSpy.mockRestore();
  });

  it("shows an empty state for missing contracts", () => {
    window.history.pushState({}, "", "/contracts/inexistente");

    render(<App />);

    expect(screen.getByText("Contrato inexistente")).toBeInTheDocument();
  });
});
