# Elias Rodrigues — Portfólio

Portfólio em português e inglês, com cinco demonstrações autorais de desenvolvimento web, páginas individuais, categorias web/jogos e formulário de contato. Construído com Next.js, React, GSAP e Framer Motion. Não requer banco de dados.

## Executar

```sh
npm install
npm run dev
```

Abra a URL exibida pelo Next.js. Para produção:

```sh
npm run build
npm start
```

## Alterar o e-mail de contato

Copie o modelo para um arquivo local:

```sh
cp .env.example .env.local
```

Edite estas três variáveis em `.env.local` ou no painel da hospedagem:

```dotenv
CONTACT_TO_EMAIL=eliotfonse99@gmail.com
CONTACT_FROM_EMAIL=
RESEND_API_KEY=
```

- `CONTACT_TO_EMAIL`: destinatário dos contatos. Para trocar o endereço, altere apenas essa variável.
- `CONTACT_FROM_EMAIL`: remetente autorizado na sua conta Resend, por exemplo `Elias Rodrigues <contato@seu-dominio.com>`.
- `RESEND_API_KEY`: chave da sua própria conta Resend, mantida exclusivamente no servidor.

Reinicie o servidor depois de alterar as variáveis locais. Na hospedagem, aplique a alteração conforme o processo do provedor. Nunca publique `.env.local` ou uma chave real. O endereço fornecido funciona como destinatário padrão caso `CONTACT_TO_EMAIL` não seja definido.

O formulário envia nome, e-mail e mensagem pela [API do Resend](https://resend.com/docs/api-reference/emails/send-email), com o e-mail do visitante em `reply_to`. Sem remetente e chave, retorna um erro sem simular sucesso. A aceitação pelo provedor não garante chegada à caixa de entrada: domínio, entregabilidade e spam dependem da configuração da conta.

Há validação no servidor, limite de tamanho, honeypot, verificação de origem e limite de cinco tentativas por IP em 15 minutos. **O limite fica na memória de cada instância.** Em hospedagem com várias instâncias/serverless, configure também um limite compartilhado no gateway/WAF. O proxy deve substituir `x-forwarded-for` por um IP confiável. Não há armazenamento de mensagens no portfólio.

## Projetos e demonstrações

O catálogo único está em `src/Data/Projects.ts`. Edite ali textos em português/inglês, tecnologias e imagens. A página de jogos fica vazia até serem adicionados projetos reais dessa categoria.

As cinco demos ficam em `public/demos/`, com links para seus arquivos `index.html`. São cópias estáticas independentes: suas dependências não são incorporadas ao runtime do portfólio. Os projetos originais permanecem intactos.

Para atualizar as cópias a partir dos originais, com as dependências de cada demo já instaladas:

```sh
npm run demos:build -- /caminho/para/Projects/Testes
# Atualizar apenas uma demo:
npm run demos:build -- /caminho/para/Projects/Testes nexus-one
```

O script trabalha em diretórios temporários, exporta os projetos Next.js com prefixos próprios e copia somente o resultado. As capturas em `public/projects/` precisam ser atualizadas quando o visual de uma demo mudar. Os sites conceituais podem ter conteúdo apenas em português; a apresentação deles no portfólio é bilíngue.

## Idiomas e animações

Português é o padrão; `?lang=en` seleciona inglês. O seletor mantém a página atual e os links internos preservam o idioma. URLs podem ser compartilhadas diretamente. As animações respeitam `prefers-reduced-motion`; as prévias pelo ponteiro são substituídas por imagens na lista em celulares. As transições usam a rota atual, sem alterar APIs internas do roteador.

## Verificar

Requer Node.js 24 ou superior para executar os testes TypeScript com o runner nativo, sem transpilar.

```sh
npm test
npx tsc --noEmit
npm run build
npm run lint
```

Os testes nativos verificam catálogo, arquivos das demos e contato (validação, limites, falhas e contrato com o provedor). O provedor é substituído nos testes; nenhum e-mail real é enviado. Componentes antigos que não estão no fluxo atual podem ter avisos de lint anteriores à reformulação.

Testes de navegação em Chromium (execute o build antes):

```sh
npx playwright install chromium
npm run test:browser
```

O Playwright inicia a aplicação de produção na porta 3100; para usar um servidor próprio, defina `PLAYWRIGHT_BASE_URL`. Verifica as páginas em português/inglês, larguras de 320/390/768 px, menu e foco, formulário com respostas simuladas, preferência por movimento reduzido e carregamento das cinco demos. Não substitui verificação em Safari, Firefox ou aparelhos físicos.

## Prévia no celular com Cloudflare Tunnel

Com `cloudflared` instalado, execute a produção e o túnel em terminais separados:

```sh
npm run build
npm start -- --hostname 127.0.0.1 --port 3103
```

```sh
cloudflared tunnel --no-autoupdate --protocol http2 --url http://127.0.0.1:3103
```

Abra no celular a URL HTTPS `trycloudflare.com` exibida pelo comando. A prévia é pública e temporária; exige que o computador, o servidor e o túnel continuem ligados. Não publica uma hospedagem permanente.

As curvas SVG do menu, transições de página e revelação do rodapé estão ativas. O menu flutuante também aparece ao rolar no desktop. Movimento reduzido desativa o deslocamento e mantém o acesso ao conteúdo.
