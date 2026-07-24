import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "@/components/Footer";

describe("Footer", () => {
  it("shows client-facing certifications and institutional links", () => {
    render(<Footer />);

    expect(screen.getByText("ISO 9001")).toBeInTheDocument();
    expect(screen.getByText("ISO/IEC 27001")).toBeInTheDocument();
    expect(screen.getByText("ISO/IEC 27701")).toBeInTheDocument();
    expect(screen.getByText("ISO 37301")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Site Liberty Health" })).toHaveAttribute("href", "https://www.libertyhealth.com.br/");
    expect(screen.getByRole("link", { name: "LinkedIn Liberty Group" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/company/libertyhealth-io/"
    );
    expect(screen.getByRole("link", { name: "Instagram Liberty Group" })).toHaveAttribute(
      "href",
      "https://www.instagram.com/libertygroup.io/"
    );
  });
});
