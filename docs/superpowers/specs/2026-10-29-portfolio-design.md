# Portfólio de Elias Rodrigues

## Intenção
Atrair clientes para criação de sites dinâmicos e interativos. Os projetos demonstram capacidade técnica e cuidado visual. Desenvolvimento web tem prioridade; jogos continuam como área de atuação.

## Direção aprovada na conversa
Reaproveitar o que funcionar e refazer o necessário. Manter identidade visual próxima de dennissnellenberg.com: tipografia grande, tons neutros, espaços amplos, botões arredondados, movimento e transições. Conteúdo e identidade pertencem a Elias Rodrigues. Português e inglês em todo o site.

## Abordagens consideradas
1. Evoluir os componentes existentes: conserva lista, prévias, botões e menu; permite corrigir comportamento e completar páginas. Escolhida pelo usuário, com liberdade para reconstruir partes necessárias.
2. Reconstruir toda a interface: maior descarte e esforço sem benefício demonstrado. Não escolhida.

## Estrutura e conteúdo
- `/`: apresentação de Elias como desenvolvedor web freelance, especialidade em experiências interativas, seleção de projetos e chamada para contato. Aproveitar a foto existente se sua qualidade permitir.
- `/work`: lista geral de projetos, com acesso às categorias web e jogos. Na primeira entrega, cinco demonstrações web reais; nenhum jogo fictício.
- `/work/webdev`: lista dos cinco projetos web.
- `/work/gamedev`: página da categoria, com estado vazio honesto enquanto não houver trabalhos fornecidos.
- `/work/[slug]`: apresentação individual, objetivo, recursos verificáveis, tecnologias usadas, capturas reais e acesso à demonstração.
- `/about`: apresentação profissional e tecnologias informadas: Next.js, React, GSAP, Framer Motion, Tailwind, Git, Docker e PostgreSQL. Não inventar experiência, clientes, resultados ou serviços.
- `/contact`: formulário com nome, e-mail e mensagem; confirmação e erros claros.

Os cinco projetos são Forma, ORYZO, Slush, Alex Morgan e NEXUS ONE, em `/home/elioty/Documents/Projects/Testes`. Apresentá-los explicitamente como demonstrações autorais. Confirmar recursos e tecnologias lendo cada projeto. Substituir dados ilustrativos atuais por um catálogo compartilhado por listas e detalhes. Usar imagens reais das demos.

## Comportamento e acessibilidade
Preservar a lista existente como apresentação principal. Em desktop, prévia acompanha o ponteiro; em telas de toque, imagem e link permanecem acessíveis sem hover. Menu operável por teclado, foco visível, fechamento por Escape e nomes acessíveis. Layout sem rolagem horizontal em celulares. Animações de entrada, scroll e troca de página respeitam movimento reduzido. Limpar listeners, timers, animações e instâncias de scroll ao desmontar.

## Idiomas
Proposta técnica do implementador: manter URLs atuais e usar `?lang=en` para inglês, com português como padrão. Links internos preservam a escolha; seletor disponível no cabeçalho/menu. HTML, formulários, metadados e conteúdo dos projetos acompanham o idioma. Se as limitações do Next.js local tornarem outra estrutura menor e mais correta, registrar o ajuste antes de implementar.

## Contato
Enviar e-mail exclusivamente pelo servidor. Destinatário, remetente verificado e chave ficam em variáveis de ambiente; nunca no cliente ou no Git. Proposta do implementador: API HTTP do Resend, sem adicionar SDK. Validar campos e limites no servidor, usar campo antispam e limitação de frequência adequada ao ambiente de hospedagem. Tratar falhas e evitar mensagens de sucesso sem envio confirmado.

Destinatário informado: `eliotfonse99@gmail.com`, substituível por `CONTACT_TO_EMAIL`. Pendências externas: ativação real exige conta/provedor e remetente autorizado. É possível implementar e verificar validação e tratamento de falhas antes das credenciais, mas não declarar envio real validado sem elas.

## Demonstrações e hospedagem
Os projetos são aplicações separadas, com versões próprias de dependências. Não incorporá-los ao runtime do portfólio nem alterar seus originais. Decisão de implementação: exportar cópias estáticas isoladas em `public/demos/`, com acesso a `index.html`, sem alterar os originais. Hospedagem separada só será necessária se uma demo exigir backend. As cinco demos foram exportadas e integradas localmente; ficam disponíveis junto com o portfólio no deploy. Não publicar sem autorização. Botões não devem apontar para `#`, localhost em produção ou destinos inventados. A opção de visualizar só estará completa quando houver uma demo acessível no ambiente correspondente.

## Implementação e limites
Manter Next.js, React, Sass, GSAP e Framer Motion já instalados; sem Tailwind apenas por constar entre as habilidades. Ler os guias locais da versão instalada antes de escrever código e consultar Context7 quando relevante. Preservar alterações atuais do usuário, inclusive arquivos já modificados e não rastreados. Não adicionar banco, CMS, autenticação, blog ou infraestrutura Docker sem necessidade do portfólio.

## Validação
Build de produção, TypeScript e verificações de estilo aplicáveis. Verificar navegação de todas as páginas, links de detalhes, idiomas, teclado, movimento reduzido e layouts desktop/mobile em navegador. Teste pequeno para validação do contato e falhas do provedor. Verificar demos individualmente antes de descrever seu funcionamento. Registrar limitações de credenciais, publicação ou ambiente que impeçam validar partes reais.

## Critério de conclusão
Conteúdo de Elias em dois idiomas; cinco demonstrações autorais com detalhes e acesso verificável; categorias e contato funcionais; animações e transições acessíveis; navegação e mobile verificados. Envio real de e-mail e demos públicas dependem das configurações externas descritas acima.
