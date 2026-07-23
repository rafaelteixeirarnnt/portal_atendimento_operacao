# Portal de Atendimento

Portal web estático para direcionar clientes aos formulários corretos do Jira Service Management. A aplicação não abre chamados diretamente, não possui backend e não usa autenticação; todo o conteúdo vem de arquivos locais de configuração.

## Tecnologias

- React 19
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui em componentes locais
- Lucide React
- Framer Motion
- React Router
- Vitest e Testing Library

## Como Executar

```bash
npm install
npm run dev
```

O Vite exibirá a URL local, normalmente `http://localhost:5173`.

## Build

```bash
npm run build
```

Os arquivos estáticos serão gerados em `dist/` e podem ser publicados em qualquer servidor HTTP, como Nginx, GitHub Pages, GitLab Pages ou IIS.

## Docker Compose

```bash
docker compose up --build
```

O portal ficará disponível em `http://localhost:8081`. A imagem usa build multi-stage com Node para gerar `dist/` e Nginx para servir os arquivos estáticos com fallback para rotas SPA.

## Verificação

```bash
npm run lint
npm run test -- --run
npm run build
```

## Estrutura

- `src/data/contracts.ts`: contratos, categorias, serviços, palavras-chave e links.
- `src/types/contracts.ts`: interfaces TypeScript dos modelos.
- `src/utils`: busca, contagem, lookup e LocalStorage.
- `src/hooks`: contratos, busca, orientação e preferências locais.
- `src/components`: componentes reutilizáveis da aplicação.
- `src/components/ui`: componentes shadcn/ui locais.
- `src/pages`: páginas de home e contrato.
- `src/layouts`: layout principal.

## Como Adicionar Contratos

Edite `src/data/contracts.ts` e adicione um novo objeto em `contracts`:

```ts
{
  id: "novo-contrato",
  name: "Novo Contrato",
  description: "Descrição completa do contrato.",
  shortDescription: "Resumo exibido no card.",
  icon: "Building2",
  system: "Sustentação N2",
  categories: []
}
```

O `id` será usado na rota `/contracts/novo-contrato`.

## Como Adicionar Categorias

Dentro de um contrato, adicione uma categoria:

```ts
{
  id: "incidentes",
  name: "Incidentes",
  description: "Falhas, erros e indisponibilidades.",
  icon: "TriangleAlert",
  services: []
}
```

## Como Adicionar Serviços

Dentro de `services`, adicione:

```ts
{
  id: "incident",
  name: "Incidente",
  description: "Reporte erros ou indisponibilidades.",
  icon: "TriangleAlert",
  url: "https://libertyti.atlassian.net/...",
  keywords: ["erro", "falha", "prescrição"],
  system: "Jira Service Management",
  requiresGuidance: true,
  guidanceItems: defaultIncidentGuidance
}
```

Se `requiresGuidance` for `true`, o portal exibirá o modal de orientação antes de abrir o Jira.

## Como Alterar Links

Altere apenas o campo `url` do serviço correspondente em `src/data/contracts.ts`. Os botões abrem links externos com `target="_blank"` e proteção `noopener,noreferrer`.

## Boas Práticas

- Não coloque contratos, categorias ou links dentro de componentes React.
- Mantenha palavras-chave úteis para busca, incluindo termos sem acento quando fizer sentido.
- Prefira ícones existentes do Lucide React e registre o nome em `src/components/icons.ts` se adicionar novos.
- Rode lint, testes e build antes de publicar.
