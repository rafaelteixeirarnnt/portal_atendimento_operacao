import { Globe2, Instagram, Linkedin, ShieldCheck } from "lucide-react";

const certifications = [
  { code: "ISO 9001", label: "Gestão da Qualidade" },
  { code: "ISO/IEC 27001", label: "Segurança da Informação" },
  { code: "ISO/IEC 27701", label: "Privacidade da Informação" },
  { code: "ISO 37301", label: "Gestão de Compliance" }
];

const socialLinks = [
  {
    label: "Site Liberty Health",
    href: "https://www.libertyhealth.com.br/",
    Icon: Globe2
  },
  {
    label: "LinkedIn Liberty Group",
    href: "https://www.linkedin.com/company/libertyhealth-io/",
    Icon: Linkedin
  },
  {
    label: "Instagram Liberty Group",
    href: "https://www.instagram.com/libertygroup.io/",
    Icon: Instagram
  }
];

export const Footer = () => (
  <footer className="mt-10 border-t border-[#36FFC0]/20 bg-[linear-gradient(110deg,#002747_0%,#005243_58%,#002747_100%)] text-white">
    <div className="container grid gap-8 py-8 lg:grid-cols-[1.1fr_1.6fr_auto] lg:items-start">
      <div className="max-w-sm">
        <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#B0FF8C]">
          <ShieldCheck className="size-4" aria-hidden="true" />
          Portal de Atendimento
        </div>
        <p className="mt-3 text-sm leading-6 text-white/78">
          Liberty Group · Direcionamento seguro para canais oficiais de sustentação e atendimento.
        </p>
      </div>

      <section aria-labelledby="footer-certifications">
        <h2 id="footer-certifications" className="text-xs font-bold uppercase tracking-wide text-[#36FFC0]">
          Certificações
        </h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {certifications.map((certification) => (
            <div
              key={certification.code}
              className="rounded-md border border-white/12 bg-white/[0.07] px-3 py-2 shadow-sm backdrop-blur"
            >
              <p className="text-sm font-bold text-white">{certification.code}</p>
              <p className="mt-0.5 text-xs text-white/68">{certification.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="footer-social">
        <h2 id="footer-social" className="text-xs font-bold uppercase tracking-wide text-[#36FFC0]">
          Redes
        </h2>
        <div className="mt-3 flex gap-2">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.07] text-[#B0FF8C] transition-colors hover:border-[#36FFC0]/55 hover:bg-[#36FFC0]/12 hover:text-white"
            >
              <Icon className="size-4" aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>
    </div>

    <div className="border-t border-white/10">
      <div className="container flex flex-col gap-2 py-4 text-xs text-white/62 sm:flex-row sm:items-center sm:justify-between">
        <p>Uso interno e direcionamento seguro para canais oficiais de atendimento.</p>
        <p>© 2026 Liberty Group</p>
      </div>
    </div>
  </footer>
);
