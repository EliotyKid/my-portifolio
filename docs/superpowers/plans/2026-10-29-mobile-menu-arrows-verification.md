# Correções de menu, alinhamento mobile e setas

- Menu mobile fixo na tela; passa para botão circular após 80px de scroll. Desktop mantém a entrada após a primeira altura de tela.
- Causa da curva invisível: autofocus no botão de fechar deslocava scrollLeft da camada de backdrop enquanto o painel ainda estava fora da tela. Foco inicial agora usa preventScroll e a camada usa overflow:clip. Mantidos Escape, contenção de foco e scroll vertical interno.
- Setas tipográficas substituídas por ScrollArrow SVG em todos os componentes ativos, incluindo cabeçalho, hero, lista, rodapé, formulário, páginas e navegação entre projetos. Orientação preservada; GSAP ScrollTrigger controla rotação e deslocamento, com limpeza e movimento reduzido.
- Botão de contato mobile centralizado entre duas linhas, com texto centralizado e ícone abaixo. Mesma organização interna aplicada ao botão de envio.
- Regressões observadas antes das correções: menu fora do viewport ao rolar, ausência de SVG nas setas, label do contato sem estrutura e scroll horizontal do backdrop ocultando curva.
- Verificação final: build aprovado, TypeScript sem erros, 10 testes nativos e 21 testes Chromium aprovados, Biome de 23 arquivos aprovado. Inspeção visual das capturas mobile de rodapé e curva.
- Prévia de produção atualizada na porta 3103; Cloudflare Tunnel temporário existente preservado.
- Não validado em aparelhos físicos ou Safari. Envio real de e-mail continua dependente das credenciais.
