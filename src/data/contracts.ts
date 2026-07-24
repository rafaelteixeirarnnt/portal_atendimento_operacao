import type { Contract, GuidanceItem } from "@/types/contracts";

const jiraRequestsUrl =
  "https://libertyti.atlassian.net/servicedesk/customer/user/requests?reporter=all&statuses=open";

export const defaultIncidentGuidance: GuidanceItem[] = [
  { id: "screenshot", label: "Print da tela" },
  { id: "path", label: "Caminho da funcionalidade" },
  { id: "steps", label: "Passos para reproduzir" },
  { id: "error", label: "Mensagem de erro" },
  { id: "time", label: "Horário aproximado" },
  { id: "user", label: "Usuário afetado" }
];

const baseCategories = {
  support: {
    id: "support",
    name: "Atendimento Geral",
    description: "Incidentes, dúvidas e solicitações relacionadas ao atendimento.",
    icon: "MessagesSquare"
  },
  bi: {
    id: "business-intelligence",
    name: "Business Intelligence",
    description: "Acessos, erros e senhas dos painéis de BI.",
    icon: "ChartColumn"
  },
  users: {
    id: "usuarios",
    name: "Usuários",
    description: "Cadastros, permissões e acessos de usuários.",
    icon: "Users"
  },
  training: {
    id: "treinamentos",
    name: "Treinamentos",
    description: "Visitas técnicas, treinamentos, reuniões e Universidade Liberty.",
    icon: "GraduationCap"
  }
} as const;

const commonSupportServices = [
  {
    id: "requests",
    name: "Ver meus chamados abertos",
    description: "Acompanhe o status dos chamados que você já abriu.",
    icon: "FolderOpen",
    url: jiraRequestsUrl,
    keywords: ["acompanhar", "status", "chamado", "aberto", "andamento"],
    system: "Jira Service Management"
  },
  {
    id: "incident",
    name: "Incidente",
    description: "Reporte erros, falhas ou indisponibilidades no sistema.",
    icon: "TriangleAlert",
    url: "https://libertyti.atlassian.net/servicedesk/customer/portal/219/create/1496",
    keywords: ["erro", "falha", "indisponibilidade", "problema", "prescrição", "prescricao"],
    system: "Jira Service Management",
    requiresGuidance: true,
    guidanceItems: defaultIncidentGuidance
  },
  {
    id: "question",
    name: "Dúvida",
    description: "Tire dúvidas sobre funcionalidades institucionalizadas ou processos.",
    icon: "CircleHelp",
    url: "https://libertyti.atlassian.net/servicedesk/customer/portal/219/create/1699",
    keywords: ["dúvida", "duvida", "orientação", "processo", "funcionalidade"],
    system: "Jira Service Management"
  },
  {
    id: "service-request",
    name: "Solicitação de serviço",
    description: "Peça configurações, ajustes ou execução de serviços.",
    icon: "Wrench",
    url: "https://libertyti.atlassian.net/servicedesk/customer/portal/219/create/1700",
    keywords: ["solicitação", "solicitacao", "serviço", "servico", "ajuste", "configuração"],
    system: "Jira Service Management"
  }
];

const visitService = {
  id: "visit-training-meeting",
  name: "Solicitação de visita/treinamento/reunião",
  description: "Agende visita técnica, treinamento ou reunião.",
  icon: "CalendarDays",
  url: "https://libertyti.atlassian.net/servicedesk/customer/portal/219/create/1703",
  keywords: ["visita", "treinamento", "reunião", "reuniao", "agenda"],
  system: "Jira Service Management"
};

const universityService = {
  id: "universidade-liberty",
  name: "Criar usuário na Universidade Liberty",
  description: "Solicite cadastro de novo usuário na universidade corporativa.",
  icon: "GraduationCap",
  url: "https://libertyti.atlassian.net/servicedesk/customer/portal/219/create/1839",
  keywords: ["universidade", "liberty", "criar usuário", "cadastro", "senha", "treinamento"],
  system: "Universidade Liberty"
};

const createEinsteinContract = (id: string, name: string, state: Contract["state"], stateName: string): Contract => ({
  id,
  name,
  description: `Canais de atendimento do contrato ${name}.`,
  shortDescription: `Serviços do Hospital Israelita Albert Einstein em ${stateName}.`,
  icon: "Landmark",
  state,
  system: "Sustentação N2",
  categories: [
    {
      ...baseCategories.support,
      services: commonSupportServices
    },
    {
      ...baseCategories.training,
      services: [visitService, universityService]
    }
  ]
});

export const contracts: Contract[] = [
  {
    id: "sms-sp",
    name: "SMS-SP",
    description: "Contrato da Secretaria Municipal de Saúde de São Paulo.",
    shortDescription: "Canais de atendimento do contrato SMS-SP.",
    icon: "Building2",
    brandLogo: {
      src: "/contracts/sms-sp-horizontal.png",
      alt: "Prefeitura de São Paulo"
    },
    state: "SP",
    system: "Sustentação N2",
    categories: [
      {
        ...baseCategories.support,
        services: commonSupportServices
      },
      {
        ...baseCategories.bi,
        services: [
          {
            id: "bi-access",
            name: "Solicitar acesso ao BI",
            description: "Solicite liberação de acesso aos painéis de BI.",
            icon: "ChartColumn",
            url: "https://libertyti.atlassian.net/servicedesk/customer/portal/219/create/2940",
            keywords: ["bi", "business intelligence", "painel", "acesso", "indicadores"],
            system: "Business Intelligence"
          },
          {
            id: "bi-error",
            name: "Reportar erro no BI",
            description: "Informe problemas ou inconsistências nos dados do BI.",
            icon: "Bug",
            url: "https://libertyti.atlassian.net/servicedesk/customer/portal/219/create/2942",
            keywords: ["bi", "erro", "dados", "painel", "indicadores", "falha"],
            system: "Business Intelligence",
            requiresGuidance: true,
            guidanceItems: defaultIncidentGuidance
          },
          {
            id: "bi-password-reset",
            name: "Reset de senha para BI",
            description: "Solicite redefinição de senha de acesso ao BI.",
            icon: "KeyRound",
            url: "https://libertyti.atlassian.net/servicedesk/customer/portal/219/create/2941",
            keywords: ["senha", "reset", "redefinir", "bi", "acesso"],
            system: "Business Intelligence"
          }
        ]
      },
      {
        ...baseCategories.users,
        services: [
          {
            id: "user-registration",
            name: "Cadastro de usuários",
            description: "Cadastre usuários no sistema; exige código de segurança.",
            icon: "ShieldCheck",
            url: "https://libertyti.atlassian.net/servicedesk/customer/portal/11/create/1429",
            keywords: ["cadastro", "usuário", "usuario", "senha", "código", "segurança", "permissão"],
            system: "Gestão de Usuários"
          }
        ]
      },
      {
        ...baseCategories.training,
        services: [visitService, universityService]
      }
    ]
  },
  {
    ...createEinsteinContract("einstein-ses-sp", "Einstein SES-SP", "SP", "São Paulo"),
    brandLogo: {
      src: "/contracts/einstein-horizontal.png",
      alt: "Einstein Hospital Israelita"
    }
  },
  {
    ...createEinsteinContract("einstein-ses-ma", "SES-MA", "MA", "Maranhão"),
    brandLogo: {
      src: "/contracts/ses-ma-horizontal.png",
      alt: "Governo do Maranhão"
    }
  },
  {
    ...createEinsteinContract("einstein-ses-mt", "Einstein SES-MT", "MT", "Mato Grosso"),
    brandLogo: {
      src: "/contracts/ses-mt-horizontal.png",
      alt: "SES Secretaria de Estado de Saúde - Governo de Mato Grosso"
    }
  }
];
