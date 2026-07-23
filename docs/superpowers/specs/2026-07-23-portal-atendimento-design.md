# Portal de Atendimento Design

## Objetivo

Criar um portal web estático para direcionar clientes aos formulários corretos do Jira Service Management. O portal não abre chamados diretamente, não autentica usuários e não usa backend; ele organiza contratos, categorias e serviços a partir de configuração local e redireciona para links externos em nova aba.

## Stack

- React 19, TypeScript estrito e Vite.
- TailwindCSS para o sistema visual.
- Componentes shadcn/ui para botões, cards, dialog, accordion, input, dropdown, breadcrumb e empty states.
- Lucide React para ícones.
- Framer Motion apenas em microinterações de entrada, hover e transições leves.
- React Router para rotas internas.

## Experiência

A tela inicial mostra marca, título `Portal de Atendimento`, subtítulo `Escolha o contrato para acessar os canais corretos de atendimento.`, campo de busca e cards de contratos. A estética deve ser minimalista, premium e funcional, inspirada por Notion, Linear, Vercel e Stripe: fundo claro, muito espaço em branco, bordas discretas, sombras suaves e azul institucional como destaque. O tema escuro mantém o mesmo grau de contraste e sobriedade.

Ao selecionar um contrato, a aplicação navega para `/contracts/:contractId`, sem modal. A página do contrato mostra breadcrumb, nome, descrição, quantidade de serviços e categorias em accordion. Cada serviço aparece em card com ícone, nome, descrição e botão `Abrir chamado`.

Alguns serviços exigem orientação antes do redirecionamento. Para esses, o botão abre um dialog com checklist de evidências, botões `Voltar` e `Continuar para o Jira`; ao continuar, o link abre em nova aba com `noopener noreferrer`.

## Dados

Todo conteúdo editável fica em `src/data/contracts.ts`, tipado por interfaces em `src/types/contracts.ts`. Componentes não devem conter contratos ou links fixos. A navegação, busca, contagem de serviços, categorias e cards derivam exclusivamente da configuração.

Os dados iniciais vêm do protótipo `portal-sustentacao.html`: SMS-SP, Einstein SES-SP, Einstein SES-MT e Einstein SES-MA, com os links de Jira já existentes. Serviços semelhantes serão agrupados em categorias como Atendimento Geral, Business Intelligence, Usuários e Treinamentos.

## Busca

A busca funciona em tempo real no frontend. Ela pesquisa contrato, sistema, categoria, serviço, descrição e palavras-chave. Na home, resultados de busca destacam contratos que contêm serviços encontrados e uma lista de serviços correspondentes quando a consulta está preenchida. Na página de contrato, a busca filtra categorias e serviços do contrato atual.

## Preferências Locais

Usar LocalStorage para:

- Tema `light`, `dark` ou `system`.
- Último contrato acessado.
- Últimos serviços utilizados.

O armazenamento deve ser versionado por chaves específicas para evitar colisão com outros sites.

## Estados

Implementar empty states para:

- Nenhum resultado encontrado.
- Contrato inexistente.
- Categoria sem serviços.
- Serviço indisponível quando não houver URL válida.
- Erro ao carregar configuração, tratado por validação local simples.

## Responsividade E Acessibilidade

Desktop usa 3 colunas para contratos e 2 para serviços; tablet usa 2 colunas; celular usa 1 coluna. A interface deve usar HTML semântico, foco visível, botões e links reais, labels acessíveis, `aria-label` quando necessário e indicação visual de links que abrem nova aba.

## Componentes

Componentes previstos:

- `Header`
- `Footer`
- `ThemeToggle`
- `SearchBar`
- `ContractCard`
- `ServiceCard`
- `CategoryAccordion`
- `GuidanceModal`
- `BreadcrumbNav`
- `EmptyState`

Hooks previstos:

- `useContracts`
- `useSearch`
- `useGuidance`
- `useLocalPreferences`

## Testes E Verificação

Cobrir a lógica de busca, contagem de serviços, preferências locais e renderização das rotas principais com Vitest e Testing Library. Antes da entrega, executar lint, testes e build. Também rodar o servidor local e verificar visualmente desktop e mobile.

## Fora Do Escopo

Não implementar backend, login, autenticação, banco de dados, APIs próprias, criação direta de chamados ou integração real com Jira além dos links externos.
